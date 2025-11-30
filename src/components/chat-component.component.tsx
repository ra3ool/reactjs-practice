import { useSocket } from '@/hooks/useSocket';
import { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

interface ChatMessage {
  text: string;
  timestamp: string;
  user: string;
  type: 'message' | 'system';
}

export const ChatComponent: FC = () => {
  const { isConnected, emit, on, off, lastError } = useSocket();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(scrollToBottom, [messages]);

  const pushMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  useEffect(() => {
    const onMessage = (msg: ChatMessage) => pushMessage(msg);

    const onJoined = (msg: Omit<ChatMessage, 'type'>) =>
      pushMessage({ ...msg, type: 'system' });

    const onLeft = (msg: Omit<ChatMessage, 'type'>) =>
      pushMessage({ ...msg, type: 'system' });

    on('chat:message', onMessage);
    on('chat:user_joined', onJoined);
    on('chat:user_left', onLeft);

    return () => {
      off('chat:message', onMessage);
      off('chat:user_joined', onJoined);
      off('chat:user_left', onLeft);
    };
  }, [on, off, pushMessage]);

  /* SEND MESSAGE */

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !isConnected) return;

    const msg: ChatMessage = {
      text: inputMessage,
      timestamp: new Date().toISOString(),
      user: 'You',
      type: 'message',
    };

    emit('chat:message', msg);
    pushMessage(msg);
    setInputMessage('');
  };

  const clearMessages = () => setMessages([]);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div
            className={`w-4 h-4 rounded-full animate-pulse ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Live Chat
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isConnected ? 'Connected and ready' : 'Trying to connect…'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Messages
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {messages.length}
            </div>
          </div>

          <button
            onClick={clearMessages}
            className="px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Clear
          </button>
        </div>
      </div>

      {lastError && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          Error: {lastError.message}
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-6 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 dark:text-gray-500 py-20">
            <p className="text-lg">No messages yet</p>
            <p className="text-sm">Be the first to start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={`${msg.timestamp}-${index}`}
                className={`p-4 rounded-xl transition shadow-sm ${
                  msg.type === 'system'
                    ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex justify-between mb-1">
                  <span
                    className={`font-semibold ${
                      msg.type === 'system'
                        ? 'text-amber-800 dark:text-amber-300'
                        : 'text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {msg.user}
                  </span>

                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <p className="text-gray-800 dark:text-gray-200">{msg.text}</p>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex space-x-3">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={!isConnected}
          placeholder={
            isConnected ? 'Type a message…' : 'Waiting for connection…'
          }
          className="flex-1 px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 dark:disabled:bg-gray-800"
        />

        <button
          type="submit"
          disabled={!isConnected || !inputMessage.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl disabled:bg-gray-400 dark:disabled:bg-gray-600 transition"
        >
          Send
        </button>
      </form>

      <div className="mt-4 flex space-x-2">
        {['Hello! 👋', 'How are you? 😊', 'This is awesome! 🚀'].map((msg) => (
          <button
            key={msg}
            onClick={() => setInputMessage(msg)}
            disabled={!isConnected}
            className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50"
          >
            {msg}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Press Enter to send
        </span>
        <span
          className={`text-xs ${
            inputMessage.length > 450
              ? 'text-red-500 dark:text-red-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {inputMessage.length}/500
        </span>
      </div>
    </div>
  );
};
