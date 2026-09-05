import { Router } from 'express';
import { getSystemStats } from '../controllers/systemController';
import { chatWithJarvis, getJarvisStatus } from '../controllers/jarvisController';
import { getWeather } from '../controllers/weatherController';
import {
  getSuitTelemetry,
  postHardwareTelemetry,
  toggleReactor,
  toggleHelmet
} from '../controllers/telemetryController';
import { executeCommand } from '../controllers/commandController';
import { validateChatMessage, validateCommandExecution } from '../middleware/validator';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'IRON MAN SUIT MARK LXXXV',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// System Monitor
router.get('/system', getSystemStats);

// JARVIS AI
router.post('/jarvis/chat', validateChatMessage, chatWithJarvis);
router.get('/jarvis/status', getJarvisStatus);

// Weather
router.get('/weather', getWeather);

// Suit Telemetry & Hardware
router.get('/suit/status', getSuitTelemetry);
router.post('/suit/telemetry', postHardwareTelemetry);
router.post('/suit/reactor/toggle', toggleReactor);
router.post('/suit/helmet/toggle', toggleHelmet);

// Safe Commands
router.post('/commands', validateCommandExecution, executeCommand);

export default router;
