export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ConversationContext {
  history: ChatMessage[];
  systemStats?: {
    cpuUsage: number;
    ramUsage: number;
    uptime: number;
  };
  suitTelemetry?: {
    battery: number;
    corePower: number;
    temperature: number;
    helmet: boolean;
  };
}

export interface AIResponse {
  text: string;
  commandDetected?: {
    type: string;
    target?: string;
    payload?: Record<string, any>;
  };
  confidence?: number;
  provider: string;
}

export interface AIProvider {
  readonly name: string;
  generateResponse(prompt: string, context: ConversationContext): Promise<AIResponse>;
}
