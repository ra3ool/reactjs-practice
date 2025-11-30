import { socket } from '@/libs/socket';
import { ReactNode } from 'react';
import { SocketContext } from './SocketContext';

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
