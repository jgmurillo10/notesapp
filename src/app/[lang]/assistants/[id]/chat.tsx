'use client';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import { roles } from './roles';
import type { Message } from 'ai/react';
import { LoginComponent } from '@/components/auth/auth';
import { Spinner } from '@/components/spinner';
import {
  AcademicCapIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { ChatMessage } from './ChatMessage';

export const Chat = ({ role }: { role: string }) => {
  const initialMessages = roles[role as keyof typeof roles]
    ? [roles[role as keyof typeof roles] as Message]
    : [];
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({ initialMessages });
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Spinner />;
  }

  if (!session) {
    return <LoginComponent />;
  }

  return (
    <div className="py-16">
      <div className="mx-auto w-full max-w-lg flex flex-col stretch border border-slate-300 rounded">
        <div className="flex flex-row border-b border-slate-300 dark:bg-slate-900 p-4 rounded-t">
          <AcademicCapIcon className="w-6 h-6 rounded-full bg-slate-300 dark:bg-white text-black p-1 mr-2" />
          <span>Assistant</span>
          <CheckCircleIcon className="w-6 h-6 rounded-full text-lime-500 ml-2" />
        </div>
        <div className="min-h-[50vh] max-h-[75vh] overflow-x-scroll">
          <div className="flex flex-wrap">
            <p className="basis-full text-center my-4">
              <span className="p-2 mx-auto bg-slate-800 text-slate-300 rounded-md">
                Today
              </span>
            </p>
            <p className="p-2 mx-auto bg-slate-800 text-slate-300 rounded-md">
              Messages are not hosted. Start chatting with your assistant.
            </p>
          </div>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <form
          className="flex items-center shadow-xl mt-auto"
          onSubmit={handleSubmit}
        >
          <label className="flex-1">
            <input
              placeholder="Your message here!"
              className="w-full max-w-lg bottom-0 border border-gray-300 focus:ring-4 focus:ring-blue-300 rounded-l text-black"
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
