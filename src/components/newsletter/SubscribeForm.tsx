'use client';

import React, { useState } from 'react';
import { useSubscribe } from './useSubscribe';

const subscriptionUrl =
  'https://juanmurillo.us20.list-manage.com/subscribe/post?u=8099ac62ba887740228d614c1&id=1ffbb498a4';

type AllProps = {
  label: string;
  placeholder: string;
  submitLabel: string;
};
export const SubscribeForm = ({
  label,
  placeholder,
  submitLabel,
}: AllProps) => {
  const { isLoading, message, handleSubscription } = useSubscribe({
    url: subscriptionUrl,
  });
  const [email, setEmail] = useState('');

  return (
    <>
      <form
        onSubmit={(e) => handleSubscription(e, email)}
        className="mt-6 flex max-w-md gap-x-4"
      >
        <label htmlFor="email" className="sr-only">
          {label}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          value={email}
          onChange={(e: React.SyntheticEvent) =>
            setEmail((e.target as HTMLInputElement).value)
          }
        />
        <button
          disabled={isLoading}
          type="submit"
          className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          {isLoading ? 'Loading...' : submitLabel}
        </button>
      </form>
      {message && <p className="basis-full mt-2 text-xs">{message}</p>}
    </>
  );
};
