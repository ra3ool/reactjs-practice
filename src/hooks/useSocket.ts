import { useSocketContext } from '@/contexts/SocketContext';
import { useCallback, useEffect, useState } from 'react';

export const useSocket = () => {
  const socket = useSocketContext();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastError, setLastError] = useState<Error | null>(null);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setLastError(null);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onError = (err: unknown) => {
      setLastError(err instanceof Error ? err : new Error(String(err)));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onError);
    socket.on('error', onError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onError);
      socket.off('error', onError);
    };
  }, [socket]);

  const emit = useCallback(
    <T>(event: string, payload: T) => {
      socket.emit(event, payload);
    },
    [socket],
  );

  const on = useCallback(
    <T>(event: string, callback: (data: T) => void) => {
      socket.on(event, callback);
    },
    [socket],
  );

  const off = useCallback(
    <T>(event: string, callback: (data: T) => void) => {
      socket.off(event, callback);
    },
    [socket],
  );

  return { socket, isConnected, emit, on, off, lastError };
};
