'use client';
import { LoginButton } from '@/components/login'
import Link from 'next/link'
import AuthProvider from '@/app/AuthProvider';

export const NavBar = ({ children }: {
  children: React.ReactNode
}) => (
  <AuthProvider>
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 px-8" aria-label="Global">
        <div className="flex flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div className="flex gap-x-2 lg:flex lg:gap-x-12">
          <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
            Home
          </Link>
          <Link href="/notes" className="text-sm font-semibold leading-6 text-gray-900">
            Notes
          </Link>
        </div>
        <div className="flex flex-1 justify-end lg:flex lg:flex-1 lg:justify-end">
          <LoginButton />
        </div>
      </nav>
    </header>
    {children}
  </AuthProvider>
);
