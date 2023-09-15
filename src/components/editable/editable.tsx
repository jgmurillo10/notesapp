'use client';
import { LocalMessage } from '@/app/[lang]/playground/playground';
import { useEffect, useRef, useState } from 'react';

export const Editable = ({
  message,
  handleOnChange,
}: {
  message: LocalMessage;
  handleOnChange: (e: React.SyntheticEvent, id: string) => void;
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>();
  const placeholder = `Enter an ${message.role} message here.`;

  const handleEditMode = () => {
    setIsEditable(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyUp = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '1px';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  };

  return (
    <>
      <textarea
        ref={inputRef}
        onBlur={() => setIsEditable(false)}
        className={`text-black h-[40px] w-full ${isEditable ? '' : 'hidden'}`}
        onChange={(e) => handleOnChange(e, message.uuid)}
        onKeyUp={handleKeyUp}
        onFocus={handleKeyUp}
        value={message.content}
        placeholder={placeholder}
      />
      <div
        onClick={handleEditMode}
        className={`p-2 min-h-full whitespace-pre-wrap max-w-full w-full text-black border-2 border-transparent hover:bg-slate-100 hover:cursor-pointer dark:bg-white ${
          isEditable ? 'hidden' : ''
        }`}
      >
        {message.content ? message.content : placeholder}
      </div>
    </>
  );
};
