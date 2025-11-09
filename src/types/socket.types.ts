import { ReactNode } from 'react';

export interface SocketMessage {
  text: string;
  timestamp: string;
  user?: string;
  type?: 'message' | 'system' | 'notification';
  id?: string;
}

export interface SocketOptions {
  autoConnect?: boolean;
  transports?: string[];
  query?: Record<string, string>;
  auth?: {
    token?: string;
  };
}

export interface SocketState {
  isConnected: boolean;
  lastMessage: SocketMessage | null;
  lastError: Error | null;
}

export interface SocketActions {
  emit: <T = unknown>(event: string, data: T) => void;
  on: <T = unknown>(event: string, callback: (data: T) => void) => void;
  off: <T = unknown>(event: string, callback: (data: T) => void) => void;
  connect: () => void;
  disconnect: () => void;
}

export type SocketContextType = SocketState & SocketActions;

export interface UserJoinLeaveEvent {
  user: string;
  text: string;
  timestamp: string;
  type: 'system';
}

export interface ChatMessageEvent {
  text: string;
  timestamp: string;
  user: string;
  type: 'message';
  id?: string;
}

export type SocketEventData =
  | SocketMessage
  | UserJoinLeaveEvent
  | ChatMessageEvent;

export type MessageCallback = (data: SocketMessage) => void;
export type GenericCallback<T = unknown> = (data: T) => void;

export interface SocketProviderProps {
  children: ReactNode;
  url: string;
  options?: SocketOptions;
}
