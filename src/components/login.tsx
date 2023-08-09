'use client';
import { useSession, signIn } from 'next-auth/react'

export const LoginComponent = () => {
  const { data: session, status } = useSession();
  console.log('>>>', {status, session});
  return (
    <div>
      <p>Sign in:</p>
      <p>{status}</p>
      <SignInButton />
    </div>
  )
}

export const SignInButton = () => {
  return (
    <button onClick={() => signIn('google')}>Sign in with Google</button>
  )
}