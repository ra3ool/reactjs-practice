import {
  SocketActions,
  // SocketEventData,
  SocketMessage,
  SocketOptions,
  SocketState,
} from '@/types/socket.types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (
  url: string,
  options: SocketOptions = {},
): SocketState & SocketActions => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<SocketMessage | null>(null);
  const [lastError, setLastError] = useState<Error | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const connect = useCallback((): void => {
    try {
      socketRef.current = io(url, {
        transports: ['websocket'],
        autoConnect: false,
        ...options,
      });

      if (!socketRef.current) return;

      socketRef.current.on('connect', () => {
        setIsConnected(true);
        setLastError(null);
        console.log('Socket connected successfully');
      });

      socketRef.current.on('disconnect', () => {
        setIsConnected(false);
        console.log('Socket disconnected');
      });

      socketRef.current.on('error', (error: Error) => {
        setLastError(error);
        console.error('Socket error:', error);
      });

      socketRef.current.on('connect_error', (error: Error) => {
        setLastError(error);
        console.error('Socket connection error:', error);
      });

      socketRef.current.on('chat message', (message: SocketMessage) => {
        setLastMessage(message);
      });

      socketRef.current.connect();
    } catch (error) {
      const socketError =
        error instanceof Error ? error : new Error('Unknown socket error');
      setLastError(socketError);
      console.error('Failed to initialize socket:', socketError);
    }
  }, [url, options]);

  const disconnect = useCallback((): void => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      console.log('Socket manually disconnected');
    }
  }, []);

  const emit = useCallback(
    <T = unknown>(event: string, data: T): void => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit(event, data);
      } else {
        console.warn('Socket not connected. Cannot emit event:', event);
      }
    },
    [isConnected],
  );

  const on = useCallback(
    <T = unknown>(event: string, callback: (data: T) => void): void => {
      if (socketRef.current) {
        socketRef.current.on(event, callback);
      }
    },
    [],
  );

  const off = useCallback(
    <T = unknown>(event: string, callback: (data: T) => void): void => {
      if (socketRef.current) {
        socketRef.current.off(event, callback);
      }
    },
    [],
  );

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    lastMessage,
    lastError,
    emit,
    on,
    off,
    connect,
    disconnect,
  };
};
