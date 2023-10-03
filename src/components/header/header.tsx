'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import { Locale } from '../../../i18n-config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationItem = {
  name: string;
  href: string;
};
type AllProps = {
  navigation: NavigationItem[];
  lang: Locale;
};
export const Header = ({ navigation: items, lang }: AllProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const navigation = items.map((item) => ({
    name: item.name,
    href: `/${lang}/${item.href}`,
  }));

  const close = () => setMobileMenuOpen(false);

  useEffect(() => close(), [pathname]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">AIssistants</span>
            <ChatBubbleBottomCenterIcon className="h-6 w-6" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 dark:text-white" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {status !== 'loading' && !session ? (
            <button
              onClick={() => signIn()}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Log in<span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              <span aria-hidden="true">&larr;</span> Log out
            </button>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto text-white bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-white">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">AIssistants</span>
              <ChatBubbleBottomCenterIcon className="h-6 w-6 text-black dark:text-white" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                className="h-6 w-6 dark:text-white"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-slate-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {status !== 'loading' && !session ? (
                  <button
                    onClick={() => signIn()}
                    className=" -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-slate-700"
                  >
                    Log in
                  </button>
                ) : (
                  <button
                    onClick={() => signOut()}
                    className=" -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-slate-700"
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
