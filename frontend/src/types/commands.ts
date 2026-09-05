export interface CommandRecord {
  id: string;
  timestamp: string;
  source: 'USER_VOICE' | 'USER_TEXT' | 'SYSTEM';
  commandText: string;
  commandType?: string;
  response: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}
