import { Request, Response } from 'express';
import { JarvisAssistant } from '../../../ai/assistant/assistant';
import { DemoAIProvider } from '../../../ai/providers/DemoAIProvider';
import { OpenAIProvider } from '../../../ai/providers/OpenAIProvider';
import { config } from '../config';
import { commandExecutorService } from '../services/commandExecutorService';
import { systemMonitorService } from '../services/systemMonitorService';
import { hardwareTelemetryService } from '../services/hardwareTelemetryService';
import { logger } from '../utils/logger';

// Initialize AI Provider
const provider =
  config.ai.provider === 'openai' && config.ai.openaiApiKey
    ? new OpenAIProvider(config.ai.openaiApiKey, config.ai.openaiModel)
    : new DemoAIProvider();

const jarvisAssistant = new JarvisAssistant(provider);

export async function chatWithJarvis(req: Request, res: Response) {
  const startTime = Date.now();
  const { message } = req.body;

  try {
    // Gather system & suit telemetry for live contextual awareness
    const [systemStats, suitTelemetry] = await Promise.all([
      systemMonitorService.getSystemStats().catch(() => undefined),
      Promise.resolve(hardwareTelemetryService.getTelemetry())
    ]);

    const context = {
      systemStats: systemStats ? {
        cpuUsage: systemStats.cpuUsage,
        ramUsage: systemStats.ramUsagePercent,
        uptime: systemStats.uptimeSeconds
      } : undefined,
      suitTelemetry: {
        battery: suitTelemetry.battery,
        corePower: suitTelemetry.corePower,
        temperature: suitTelemetry.temperature,
        helmet: suitTelemetry.helmet
      }
    };

    const aiResponse = await jarvisAssistant.processUserInput(message, context);
    let commandResult: any = null;

    // If a safe command was detected, execute it via the whitelist executor
    if (aiResponse.commandDetected) {
      commandResult = await commandExecutorService.executeCommand(aiResponse.commandDetected);
    }

    const latencyMs = Date.now() - startTime;

    res.json({
      status: 'SUCCESS',
      response: aiResponse.text,
      commandDetected: aiResponse.commandDetected || null,
      commandResult,
      provider: aiResponse.provider,
      latencyMs,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    logger.error('Jarvis chat error:', error.message);
    res.status(500).json({
      status: 'ERROR',
      response: 'My apologies, sir. An internal processor fault prevented me from completing your request.',
      message: error.message
    });
  }
}

export function getJarvisStatus(req: Request, res: Response) {
  res.json({
    status: 'ONLINE',
    mode: 'ASSISTANT',
    provider: jarvisAssistant.getProviderName(),
    version: 'Mark LXXXV Core v85.4.1',
    voiceEnabled: true,
    aiConnected: true,
    timestamp: new Date().toISOString()
  });
}
