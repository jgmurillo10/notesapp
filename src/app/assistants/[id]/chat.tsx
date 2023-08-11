"use client";
import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react';

export const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { data: session } = useSession();

  if (!session) {
    return <h2>You must login</h2>
  }

  return (
    <div>
      <h2>Chat</h2>
      <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
        {messages.map(m => (
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
