import type { Message } from 'ai/react';
import { AcademicCapIcon, UserIcon } from '@heroicons/react/24/outline';

export const ChatMessage = ({ message }: { message: Message }) => {
  if (message.role === 'user') {
    return (
      <div key={message.id} className="py-4">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                {message.content}
              </span>
            </div>
          </div>
          <UserIcon className="w-6 h-6 rounded-full order-1 bg-slate-300 dark:bg-white text-black p-1" />
        </div>
      </div>
    );
  } else if (message.role === 'assistant') {
    return (
      <div key={message.id} className="py-4">
        <div className="flex items-end">
          <div className="`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block bg-slate-200 dark:bg-white text-gray-600">
                {message.content}
              </span>
            </div>
          </div>
          <AcademicCapIcon className="w-6 h-6 rounded-full order-1 bg-slate-300 dark:bg-white text-black p-1" />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
