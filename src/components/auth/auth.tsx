'use client';
import { useSession, signIn } from 'next-auth/react';
import { useLanguage } from '@/hooks/useLanguage';
import { Toggle } from './helpers';
import { FeatureGate } from './FeatureGate';

export const LoginComponent = () => {
  const { data: session, status } = useSession();
  const { lang } = useLanguage();

  if (status === 'loading' || session) {
    return null;
  }

  return <FeatureGate />;
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
