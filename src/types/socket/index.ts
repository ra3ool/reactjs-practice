export interface ChatMessage {
  text: string;
  timestamp: string;
  user: string;
  type: 'message' | 'system';
}

export interface ServerToClientEvents {
  receive_message: (msg: ChatMessage) => void;
  user_joined: (msg: Omit<ChatMessage, 'type'>) => void;
  user_left: (msg: Omit<ChatMessage, 'type'>) => void;
}

export interface ClientToServerEvents {
  send_message: (msg: ChatMessage) => void;
}
