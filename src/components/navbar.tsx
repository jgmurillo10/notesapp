'use client';
import { LoginButton } from '@/components/login'
import Link from 'next/link'
import AuthProvider from '@/app/[lang]/AuthProvider';
import { Locale } from '../../i18n-config';

export const NavBar = ({ children, lang }: {
  children: React.ReactNode,
  lang: Locale,
}) => {
  const home = `/${lang}/`;
  const assistants = `/${lang}/assistants`;

  return (
    <AuthProvider>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 px-8" aria-label="Global">
          <div className="flex flex-1">
            <Link href={home} locale={false} className="-m-1.5 p-1.5">
              <span className="text-sm font-semibold leading-6 text-gray-900">Inicio</span>
            </Link>
          </div>
          <div className="flex gap-x-2 lg:flex lg:gap-x-12">
            <Link href={assistants} locale={false} className="text-sm font-semibold leading-6 text-gray-900">
              Assistants
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
}
