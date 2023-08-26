'use client';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import { roles } from './roles';
import type { Message } from 'ai/react';
import { LoginComponent } from '@/components/auth/auth';
import { Spinner } from '@/components/spinner';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { ChatMessage } from './ChatMessage';

export const Chat = ({ role }: { role: string }) => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      initialMessages: [roles[role as keyof typeof roles] as Message],
    });
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Spinner />;
  }

  if (!session) {
    return <LoginComponent />;
  }

  return (
    <div>
      <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <form
          className="pt-4 flex items-center shadow-xl"
          onSubmit={handleSubmit}
        >
          <label className="flex-1">
            <input
              placeholder="Your message here!"
              className="w-full max-w-md bottom-0 border border-gray-300 border-2 focus:ring-4 focus:ring-blue-300 rounded-l text-black"
              value={input}
              onChange={handleInputChange}
            />
          </label>
          <button
            className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-r text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="submit"
          >
            Send
            <PaperAirplaneIcon className="h-6 w-6 ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};
