/**
 * TODO: Add setuo panel with:
 * - model
 * - temperature
 */
'use client';
import type { Message } from 'ai/react';
import { useSession } from 'next-auth/react';

import { LoginComponent } from '@/components/auth/auth';
import { Editable } from '@/components/editable/editable';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { Spinner } from '@/components/spinner';
import {
  emptyMessageGenerator,
  useChatCompletion,
} from '@/hooks/useChatCompletion';

export type LocalMessage = Pick<Message, 'role' | 'content'> & { uuid: string };

export const Playground = () => {
  const { data: session, status } = useSession();
  const {
    isLoading,
    setMessages,
    messages,
    handleInputSystem,
    inputSystem,
    handleSubmit,
  } = useChatCompletion();

  if (status === 'loading') {
    return <Spinner />;
  }

  const handleAddMessage = () => {
    setMessages((prevMessages) => [...prevMessages, emptyMessageGenerator()]);
  };

  const handleOnChange = (e: React.SyntheticEvent, id: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.uuid !== id
          ? message
          : {
              ...message,
              content: (e.target as HTMLInputElement).value,
            },
      ),
    );
  };

  const handleRemove = (id: string) => {
    setMessages((newMessages) =>
      newMessages.filter((message) => message.uuid !== id),
    );
  };

  const toggleRole = (id: string) => {
    setMessages((newMessages) =>
      newMessages.map((message) =>
        message.uuid !== id
          ? message
          : {
              ...message,
              role: (message.role === 'user'
                ? 'assistant'
                : 'user') as Message['role'],
            },
      ),
    );
  };

  if (!session) {
    return <LoginComponent />;
  }

  return (
    <div className="sm:flex gap-4 mt-8 max-w-7xl mx-auto">
      <div className="flex-2">
        <h3 className="text-xl font-bold">System</h3>
        <textarea
          value={inputSystem}
          onChange={handleInputSystem}
          placeholder="You are a helpful assistant"
          className="w-full mt-8 max-w-xl bottom-0 border border-gray-300 focus:ring-4 focus:ring-blue-300 rounded-l text-black h-32 sm:h-96"
        />
      </div>
      <div className="flex-1 mt-8 sm:mt-0">
        <h3 className="text-xl font-bold">Messages</h3>
        <form onSubmit={handleSubmit}>
          <ul>
            {messages.map((message) => (
              <li
                key={message.uuid}
                className="flex border-b border-slate-300 dark:border-gray-200 py-8 gap-2"
              >
                <button
                  disabled={isLoading}
                  className="flex w-32 h-full justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  type="button"
                  onClick={() => toggleRole(message.uuid)}
                >
                  {message.role}
                </button>
                <Editable message={message} handleOnChange={handleOnChange} />
                <button
                  disabled={isLoading}
                  onClick={() => handleRemove(message.uuid)}
                >
                  <MinusCircleIcon className="h-6 w-6 ml-1" />
                </button>
              </li>
            ))}
          </ul>
          <button
            className="mt-8 flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="button"
            onClick={handleAddMessage}
          >
            Add message
          </button>
          <input
            disabled={isLoading}
            className="my-24 flex items-center justify-center text-white bg-blue-700 w-32 text-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="submit"
            value={isLoading ? 'Loading' : 'Send'}
          />
        </form>
      </div>
    </div>
  );
};
