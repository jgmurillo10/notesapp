'use client';
import { useSession, signIn } from 'next-auth/react'

export const LoginComponent = () => {
  const { data: session, status } = useSession();
  console.log('>>>', {status, session});
  return (
    <div>
      <SignInButton />
    </div>
  )
}

export const SignInButton = () => (
  <button className="bg-indigo-500 rounded p-2 my-2" onClick={() => signIn()}>Sign in with Google</button>
);

export const LoginButton = () => (
  <button className="text-sm font-semibold leading-6 text-gray-900" onClick={() => signIn()}>Log in <span aria-hidden="true">&rarr;</span></button>
);
