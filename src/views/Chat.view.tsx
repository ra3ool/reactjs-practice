import ChatComponent from '@/components/ChatComponent';
import { SocketProvider } from '@/contexts/SocketContext';

const socketUrl = import.meta.env.SOCKET_UTL;

const socketOptions = {
  query: {
    clientType: 'react-app',
  },
  transports: ['websocket'],
};

export default function AboutView() {
  return (
    <SocketProvider url={socketUrl} options={socketOptions}>
      <ChatComponent />
    </SocketProvider>
  );
}
