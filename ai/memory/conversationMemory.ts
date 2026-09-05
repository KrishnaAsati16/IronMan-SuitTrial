import { ChatMessage } from '../providers/AIProvider';

export class ConversationMemory {
  private messages: ChatMessage[] = [];
  private maxHistory: number;

  constructor(maxHistory: number = 20) {
    this.maxHistory = maxHistory;
  }

  public addMessage(role: 'system' | 'user' | 'assistant', content: string): void {
    this.messages.push({
      role,
      content,
      timestamp: new Date().toISOString()
    });

    if (this.messages.length > this.maxHistory) {
      this.messages = this.messages.slice(-this.maxHistory);
    }
  }

  public getHistory(): ChatMessage[] {
    return [...this.messages];
  }

  public clear(): void {
    this.messages = [];
  }
}
