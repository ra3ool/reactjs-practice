import { ChatComponent } from '@/components/chat-component.component';
import { SocketProvider } from '@/contexts/SocketProvider';

export default function ChatPage() {
  return (
    <SocketProvider>
      <ChatComponent />
    </SocketProvider>
  );
}
