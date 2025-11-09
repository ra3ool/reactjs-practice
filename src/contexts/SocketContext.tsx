import { useSocket } from '@/hooks/useSocket';
import { SocketContextType, SocketProviderProps } from '@/types/socket.types';
import { createContext, FC, useContext } from 'react';

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider: FC<SocketProviderProps> = ({
  children,
  url,
  options = {},
}) => {
  const socket = useSocket(url, options);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
