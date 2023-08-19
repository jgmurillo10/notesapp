"use client";
import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react';
import { roles } from './roles';
import type { Message } from 'ai/react';
import { LoginComponent } from '@/components/auth/auth';
import { Spinner } from '@/components/spinner';

export const Chat = ({ role }: { role: string; }) => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    initialMessages: [roles[role as keyof typeof roles] as Message],
  });
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Spinner />;
  }

  if (!session) {
    return <>
      <LoginComponent />
    </>;
  }

  return (
    <div>
      <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
        {messages.filter(m => m.role !== 'system').map(m => (
          <div key={m.id}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}
  
        <form onSubmit={handleSubmit}>
          <label>
            Say something...
            <input
              className="w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
              value={input}
              onChange={handleInputChange}
            />
          </label>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
