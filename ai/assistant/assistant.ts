import { AIProvider, AIResponse, ConversationContext } from '../providers/AIProvider';
import { ConversationMemory } from '../memory/conversationMemory';
import { CommandParser, ParsedCommand } from './commandParser';

export class JarvisAssistant {
  private provider: AIProvider;
  private memory: ConversationMemory;
  private parser: CommandParser;

  constructor(provider: AIProvider) {
    this.provider = provider;
    this.memory = new ConversationMemory(30);
    this.parser = new CommandParser();
  }

  public setProvider(provider: AIProvider): void {
    this.provider = provider;
  }

  public getProviderName(): string {
    return this.provider.name;
  }

  public async processUserInput(
    userInput: string,
    context?: Partial<ConversationContext>
  ): Promise<AIResponse> {
    const fullContext: ConversationContext = {
      history: this.memory.getHistory(),
      systemStats: context?.systemStats,
      suitTelemetry: context?.suitTelemetry
    };

    // Store user message
    this.memory.addMessage('user', userInput);

    // Generate response from active provider
    let aiResponse: AIResponse;
    try {
      aiResponse = await this.provider.generateResponse(userInput, fullContext);
    } catch (err: any) {
      aiResponse = {
        text: `My apologies, sir. An uplink divergence occurred: ${err.message}. Offline protocol engaged.`,
        confidence: 0.5,
        provider: 'JARVIS Local FailSafe'
      };
    }

    // Double check parser if provider didn't detect command
    if (!aiResponse.commandDetected) {
      const fallbackCommand = this.parser.parse(userInput);
      if (fallbackCommand) {
        aiResponse.commandDetected = fallbackCommand;
      }
    }

    // Store assistant response in memory
    this.memory.addMessage('assistant', aiResponse.text);

    return aiResponse;
  }

  public getConversationHistory() {
    return this.memory.getHistory();
  }

  public clearMemory(): void {
    this.memory.clear();
  }
}
