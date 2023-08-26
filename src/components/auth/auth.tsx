'use client';
import { useSession, signIn } from 'next-auth/react';
import { useLanguage } from '@/hooks/useLanguage';
import { Toggle } from './helpers';

export const SignInButton = () => (
  <div className="relative max-w-xl shadow px-12 py-36 mx-auto  backdrop-blur rounded-2xl">
    <p className="mb-4">
      Currently we are in <span>alpha</span> version, please subscribe to our
      newsletter to use this version and unlock the latest features.
    </p>
    <p className="mb-4">Sign in if you are already subscribed.</p>
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 rounded p-2 my-2"
      onClick={() => signIn()}
    >
      Sign in with Google
    </button>
  </div>
);

export const LoginComponent = () => {
  const { data: session, status } = useSession();
  const { lang } = useLanguage();

  if (status === 'loading' || session) {
    return null;
  }

  return <SignInButton />;
};

export const LoginButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div role="status" className="max-w-sm animate-pulse flex align-center">
        <div className="h-8 bg-slate-300 rounded-full dark:bg-slate-400 w-16 sm:w-20"></div>
      </div>
    );
  }

  return <Toggle hasSession={!!session} />;
};
