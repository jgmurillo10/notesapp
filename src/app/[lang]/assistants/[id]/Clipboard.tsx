'use client';
import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export const Clipboard = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyToClipboard = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    setIsCopied(true);
  };

  return (
    <button
      onClick={handleCopyToClipboard}
      type="button"
      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {isCopied ? (
        <div className="flex items-center">
          <CheckCircleIcon className="h-6 w-6 mr-2 text-green-400" />
          Copied
        </div>
      ) : (
        children
      )}
    </button>
  );
};
