import { signIn, signOut } from 'next-auth/react'

type Props = {
  hasSession: boolean;
}

export const Toggle = ({ hasSession }: Props) => {
  if (hasSession) {
    return (
      <button className="text-sm font-semibold leading-6 text-gray-900 dark:text-white" onClick={() => signOut()}><span aria-hidden="true">&larr;</span> Log out</button>
    )
  }

  return (
    <button className="text-sm font-semibold leading-6 text-gray-900 dark:text-white" onClick={() => signIn()}>Log in <span aria-hidden="true">&rarr;</span></button>
  )
}
