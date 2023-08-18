'use client';
import { useSession, signIn, signOut } from 'next-auth/react'

export const LoginComponent = () => {
  const { data: session, status } = useSession();

  if (status === 'loading' || session) {
    return null;
  }

  return (
    <div>
      <SignInButton />
    </div>
  )
}

export const SignInButton = () => (
  <button className="bg-indigo-500 rounded p-2 my-2" onClick={() => signIn()}>Sign in with Google</button>
);

export const LoginButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div role="status" className="max-w-sm animate-pulse flex align-center">
        <div className="h-6 bg-slate-300 rounded-full dark:bg-slate-400 w-16 sm:w-20"></div>
      </div>
    );
  }

  if (session) {
    return (
      <button className="text-sm font-semibold leading-6 text-gray-900 dark:text-white" onClick={() => signOut()}><span aria-hidden="true">&larr;</span> Log out</button>
    );
  }

  return (
    <button className="text-sm font-semibold leading-6 text-gray-900 dark:text-white" onClick={() => signIn()}>Log in <span aria-hidden="true">&rarr;</span></button>
  );
}
