import React, { FormEvent, useState } from 'react';
import type { Message } from 'ai/react';
import { v4 as uuidv4 } from 'uuid';

import { LocalMessage } from '@/app/[lang]/playground/playground';

export const emptyMessageGenerator = (): LocalMessage => ({
  uuid: uuidv4(),
  role: 'user',
  content: '',
});

export const useChatCompletion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputSystem, setInputSystem] = useState<string>('');
  const [messages, setMessages] = useState<LocalMessage[]>([
    emptyMessageGenerator(),
  ]);

  const handleStreaming = async (response: Response) => {
    if (!response.ok || !response.body) {
      throw response.statusText;
    }

    const newId = uuidv4();
    setMessages((prevMessages) => [
      ...prevMessages,
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
        setIsLoading(false);
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true });
      setMessages((prevMessages) =>
        [...prevMessages].map((message) =>
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const system: LocalMessage = {
      uuid: uuidv4(),
      role: 'system' as Message['role'],
      content: inputSystem,
    };

    const submitMessages: LocalMessage[] = [system, ...messages];

    setIsLoading(true);
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

  const handleInputSystem = (e: React.SyntheticEvent) =>
    setInputSystem((e.target as HTMLInputElement).value);

  return {
    isLoading,
    inputSystem,
    handleInputSystem,
    messages,
    setMessages,
    handleSubmit,
  };
};
