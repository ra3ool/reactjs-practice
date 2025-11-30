import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

export interface ServerToClientEvents {
  message: (msg: string) => void;
}

export interface ClientToServerEvents {
  sendMessage: (msg: string) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SOCKET_URL,
  {
    transports: ['websocket'],
    query: { clientType: 'react-app' },
  },
);
