/**
 * Variables
 * - model
 * - temperature
 * - predefined system messages
 */
'use client';
import { FormEvent, useState } from 'react';
import type { Message } from 'ai/react';
import { v4 as uuidv4 } from 'uuid';

type LocalMessage = Pick<Message, 'role' | 'content'> & { uuid: string };

const emptyMessageGenerator = (): LocalMessage => ({
  uuid: uuidv4(),
  role: 'user',
  content: '',
});

export const Playground = () => {
  const [systemMessage, setSystemMessage] = useState<string>('');
  const [messages, setMessages] = useState<LocalMessage[]>([
    emptyMessageGenerator(),
  ]);

  const handleStreaming = async (response: Response) => {
    if (!response.ok || !response.body) {
      throw response.statusText;
    }

    const newId = uuidv4();
    setMessages((newMessages) => [
      ...newMessages,
      {
        uuid: newId,
        role: 'assistant',
        content: '',
      },
    ]);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true });
      setMessages((newMessages) =>
        [...newMessages].map((message) =>
          message.uuid === newId
            ? {
                ...message,
                content: `${message.content}${decodedChunk}`,
              }
            : message,
        ),
      );
    }
  };

  const handleAddMessage = () => {
    setMessages((messages) => [...messages, emptyMessageGenerator()]);
  };

  const handleOnChange = (e: React.SyntheticEvent, id: string) => {
    setMessages((newMessages) =>
      newMessages.map((message) =>
        message.uuid !== id
          ? message
          : {
              ...message,
              content: (e.target as HTMLInputElement).value,
            },
      ),
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const system: LocalMessage = {
      uuid: uuidv4(),
      role: 'system' as Message['role'],
      content: systemMessage,
    };

    const submitMessages: LocalMessage[] = [system, ...messages];

    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: submitMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      }),
    });
    handleStreaming(response);
  };

  return (
    <div className="flex">
      <div className="border flex-2">
        <h3>System</h3>
        <textarea
          value={systemMessage}
          onChange={(e) => setSystemMessage(e.target.value)}
          placeholder="You are a helpful assistant"
          className="w-full max-w-lg bottom-0 border border-gray-300 focus:ring-4 focus:ring-blue-300 rounded-l text-black"
        />
      </div>
      <div className="flex-1 border">
        <h3>Messages</h3>
        <form onSubmit={handleSubmit}>
          <ul>
            {messages.map((message) => (
              <li key={message.uuid}>
                <button type="button" onClick={() => toggleRole(message.uuid)}>
                  {message.role}
                </button>
                <textarea
                  className="text-black"
                  onChange={(e) => handleOnChange(e, message.uuid)}
                  value={message.content}
                  placeholder={`Enter an ${message.role} message here.`}
                />
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleAddMessage}>
            Add message
          </button>
          <input type="submit" />
        </form>
      </div>
      <div className="flex-2 border">
        <h3>Setup</h3>
      </div>
    </div>
  );
};
