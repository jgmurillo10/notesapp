'use client';
import React from 'react';

export const Clipboard = ({ children }: { children: React.ReactNode }) => {
  const handleCopyToClipboard = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    alert(`Copied '${currentUrl}' to clipboard!`);
  };

  return (
    <button
      onClick={handleCopyToClipboard}
      type="button"
      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {children}
    </button>
  );
};
