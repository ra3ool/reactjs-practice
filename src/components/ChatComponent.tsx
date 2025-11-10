import { useSocketContext } from '@/contexts/SocketContext';
import {
  ChatMessageEvent,
  SocketMessage,
  UserJoinLeaveEvent,
} from '@/types/socket.types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type SystemEvent = UserJoinLeaveEvent;
type AllMessageEvents = SocketMessage | ChatMessageEvent | SystemEvent;

const AnimatedChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<AllMessageEvents[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isConnected, emit, on, off, lastError } = useSocketContext();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewMessage = useCallback((message: AllMessageEvents) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const handleChatMessage = useCallback(
    (message: SocketMessage) => {
      handleNewMessage(message);
    },
    [handleNewMessage],
  );

  const handleSystemEvent = useCallback(
    (event: SystemEvent) => {
      handleNewMessage(event);
    },
    [handleNewMessage],
  );

  useEffect(() => {
    on<SocketMessage>('chat message', handleChatMessage);
    on<UserJoinLeaveEvent>('user joined', handleSystemEvent);
    on<UserJoinLeaveEvent>('user left', handleSystemEvent);

    return () => {
      off<SocketMessage>('chat message', handleChatMessage);
      off<UserJoinLeaveEvent>('user joined', handleSystemEvent);
      off<UserJoinLeaveEvent>('user left', handleSystemEvent);
    };
  }, [on, off, handleChatMessage, handleSystemEvent]);

  const sendMessage = (e: React.FormEvent): void => {
    e.preventDefault();
    if (inputMessage.trim() && isConnected) {
      const messageData: ChatMessageEvent = {
        text: inputMessage,
        timestamp: new Date().toISOString(),
        user: 'User',
        type: 'message',
      };

      emit<ChatMessageEvent>('chat message', messageData);
      setInputMessage('');
    }
  };

  const clearMessages = (): void => {
    setMessages([]);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 h-full flex flex-col">
      {/* Header with connection indicator */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div
            className={`w-4 h-4 rounded-full animate-pulse ${
              isConnected
                ? 'bg-green-500 dark:bg-green-400'
                : 'bg-red-500 dark:bg-red-400'
            }`}
          ></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Live Chat
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isConnected ? 'Connected and ready' : 'Trying to connect...'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
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
            className="px-3 py-2 text-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Error Display */}
      {lastError && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-red-500 dark:text-red-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-red-700 dark:text-red-300 text-sm font-medium">
              Error: {lastError.message}
            </span>
          </div>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto mb-6 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
            <div className="w-20 h-20 mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-lg dark:text-gray-400">No messages yet</p>
            <p className="text-sm dark:text-gray-500">
              Be the first to start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={`${msg.timestamp}-${index}`}
                className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  msg.type === 'system'
                    ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow h-full flex flex-col-sm dark:shadow-gray-900/50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`font-semibold ${
                      msg.type === 'system'
                        ? 'text-amber-800 dark:text-amber-300'
                        : 'text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {msg.user || 'System'}
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

      {/* Input area */}
      <form onSubmit={sendMessage} className="flex space-x-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={
            isConnected ? 'Type a message...' : 'Waiting for connection...'
          }
          disabled={!isConnected}
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={!isConnected || !inputMessage.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Send
        </button>
      </form>

      {/* Quick Actions */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => setInputMessage('Hello! 👋')}
          disabled={!isConnected}
          className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-200"
        >
          Hello
        </button>
        <button
          onClick={() => setInputMessage('How are you? 😊')}
          disabled={!isConnected}
          className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-200"
        >
          How are you?
        </button>
        <button
          onClick={() => setInputMessage('This is awesome! 🚀')}
          disabled={!isConnected}
          className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-200"
        >
          Awesome!
        </button>
      </div>

      {/* Character Counter */}
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

export default AnimatedChatComponent;
