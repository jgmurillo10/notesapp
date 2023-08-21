'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '../../i18n-config';
import { useLanguage } from '@/hooks/useLanguage';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export const LocaleSwitcher = () => {
  const pathName = usePathname();
  const { lang } = useLanguage();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div>
      <ul className="flex text-sm text-gray-500 sm:text-center dark:text-gray-400 uppercase mt-2">
        <li className="mr-2">
          <GlobeAltIcon className="h-4 w-4" />
        </li>
        {i18n.locales.map((locale) => {
          return (
            <li
              key={locale}
              className={
                lang === locale
                  ? 'text-black px-1 bg-slate-200 dark:bg-white mr-2'
                  : 'mr-2 px-1'
              }
            >
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
