import { socket } from '@/libs/socket';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@/types/socket';
import { useCallback, useEffect, useState } from 'react';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastError, setLastError] = useState<Error | null>(null);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    const onConnect = () => {
      setIsConnected(true);
      setLastError(null);
    };
    const onDisconnect = () => setIsConnected(false);
    const onConnectError = (err: unknown) => {
      setLastError(err instanceof Error ? err : new Error(String(err)));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
    };
  }, []);

  const emit = useCallback(
    <Event extends keyof ClientToServerEvents>(
      event: Event,
      ...args: Parameters<ClientToServerEvents[Event]>
    ) => {
      socket.emit(event, ...args);
    },
    [],
  );

  const on = useCallback(
    <Event extends keyof ServerToClientEvents>(
      event: Event,
      callback: ServerToClientEvents[Event],
    ) => {
      socket.on(event, callback as never);
    },
    [],
  );

  const off = useCallback(
    <Event extends keyof ServerToClientEvents>(
      event: Event,
      callback: ServerToClientEvents[Event],
    ) => {
      socket.off(event, callback as never);
    },
    [],
  );

  return { isConnected, emit, on, off, lastError };
};
