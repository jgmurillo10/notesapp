"use client";
import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { roles } from './roles';
import type { Message } from 'ai/react';
import { LoginComponent } from '@/components/login';

export const Chat = ({ role }: { role: string; }) => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat();
  const { data: session, status } = useSession();

  useEffect(() => {
    setMessages([roles[role as keyof typeof roles] as Message]);
  }, []);

  useEffect(() => {
    console.log('>>>', {messages})
  }, [messages]);

  if (status === 'loading') {
    return <p>Loading...</p>
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
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
