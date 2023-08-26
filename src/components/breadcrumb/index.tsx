'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

/**
 * TODO: I18n Breadcrumb.
 */
export const Breadcrumb = () => {
  const pathname = usePathname();
  const [_, lang, assistants, assistant] = pathname.split('/');

  return (
    <div className="max-w-7xl mx-auto flex items-center my-5 gap-x-4 text-slate-600 dark:text-white">
      <Link
        className="border-b-2 border-transparent hover:border-slate-400 duration-300"
        href={`/${lang}`}
      >
        Home
      </Link>
      <ChevronRightIcon className="h-4 w-4" />
      <Link
        className="border-b-2 border-transparent hover:border-slate-400 duration-300"
        href={`/${lang}/${assistants}`}
      >
        Assistants
      </Link>
      {assistant && (
        <>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="border-b-2 border-transparent">Assistant</div>
        </>
      )}
    </div>
  );
};
