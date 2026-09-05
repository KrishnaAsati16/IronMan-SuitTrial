import { AIProvider, AIResponse, ConversationContext } from './AIProvider';
import { JARVIS_SYSTEM_PROMPT } from '../assistant/prompts';
import { CommandParser } from '../assistant/commandParser';

export class OpenAIProvider implements AIProvider {
  public readonly name = 'OpenAI GPT Core';
  private apiKey: string;
  private model: string;
  private parser = new CommandParser();

  constructor(apiKey: string, model: string = 'gpt-4o-mini') {
    this.apiKey = apiKey;
    this.model = model;
  }

  public async generateResponse(prompt: string, context: ConversationContext): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key is missing. Set OPENAI_API_KEY in your .env file or switch to demo mode.');
    }

    // Pre-check for local command parsing to guarantee deterministic whitelist execution
    const localCommand = this.parser.parse(prompt);

    const messages = [
      {
        role: 'system',
        content: `${JARVIS_SYSTEM_PROMPT}\n\nCurrent suit context: CPU ${context.systemStats?.cpuUsage ?? 'nominal'}%, RAM ${context.systemStats?.ramUsage ?? 'nominal'}%, Core Power ${context.suitTelemetry?.corePower ?? 100}%.`
      },
      ...context.history.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: prompt }
    ];

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error (${response.status}): ${JSON.stringify(errorData)}`);
      }

      const data = (await response.json()) as any;
      const text = data.choices?.[0]?.message?.content || 'Affirmative, sir.';

      return {
        text,
        commandDetected: localCommand || undefined,
        confidence: 0.95,
        provider: `${this.name} (${this.model})`
      };
    } catch (err: any) {
      console.warn(`[OpenAIProvider] Remote inference error: ${err.message}. Falling back to local parser.`);
      throw err;
    }
  }
}
