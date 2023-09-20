import type { Message } from 'ai/react';
import { AcademicCapIcon, UserIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import './../../../../components/parser/parser.css';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export const ChatMessage = ({ message }: { message: Message }) => {
  const { data } = useSession();

  if (message.role === 'user') {
    return (
      <div key={message.id} className="p-4 chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-md mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-base text-white">
                {message.content}
              </span>
            </div>
          </div>
          {data?.user?.image ? (
            <Image
              className="w-6 h-6 rounded-full order-1 bg-slate-300 dark:bg-white text-black"
              alt="user"
              src={data.user.image}
              width={24}
              height={24}
            />
          ) : (
            <UserIcon className="w-6 h-6 rounded-full order-1 bg-slate-300 dark:bg-white text-black p-1" />
          )}
        </div>
      </div>
    );
  } else if (message.role === 'assistant') {
    return (
      <div key={message.id} className="p-4">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs mx-2 order-2 items-start">
            <div>
              <div className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-slate-200 dark:bg-white text-gray-600">
                <ReactMarkdown className="chat-message">
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          <AcademicCapIcon className="hidden sm:block w-6 h-6 rounded-full order-1 bg-slate-300 dark:bg-white text-black p-1" />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
