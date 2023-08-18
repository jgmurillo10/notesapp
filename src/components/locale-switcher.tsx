'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '../../i18n-config';

export const LocaleSwitcher = () => {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  }

  return (
    <div>
      <ul className="flex text-sm text-gray-500 sm:text-center dark:text-gray-400 uppercase">
        <li className="mr-2">🌍</li>
        {i18n.locales.map((locale) => {
          return (
            <li key={locale} className="mr-2">
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
