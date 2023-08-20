import { LoginButton } from '@/components/auth/auth'
import Link from 'next/link'
import { Locale } from '../../i18n-config';
import { getDictionary } from '../../get-dictionary';
import { ThemeSwitcher } from './toggle';

export const NavBar = async ({ lang }: {
  lang: Locale,
}) => {
  const home = `/${lang}/`;
  const assistants = `/${lang}/assistants`;
  const dictionary = await getDictionary(lang);

  return (
    <header className="bg-white shadow-sm shadow-slate-300 dark:shadow-white dark:bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 px-8" aria-label="Global">
        <div className="flex flex-1">
          <Link href={home} locale={false} className="-m-1.5 p-1.5">
            <span className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{dictionary['navigation'].home}</span>
          </Link>
        </div>
        <div className="flex gap-x-2 lg:flex lg:gap-x-12">
          <Link href={assistants} locale={false} className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
          {dictionary['navigation'].assistants}
          </Link>
        </div>
        <div className="flex flex-1 justify-end lg:flex lg:flex-1 lg:justify-end">
          <LoginButton />
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
