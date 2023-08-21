import { getDictionary } from '../../get-dictionary';
import { Locale } from '../../i18n-config';
import { LocaleSwitcher } from './locale-switcher';
import { ThemeSwitcher } from './toggle';

export const Footer = async ({ lang }: { lang: Locale }) => {
  const dictionary = await getDictionary(lang);

  return (
    <footer className="flex flex-wrap justify-between items-center bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        <a href="https://juanmurillo.co/" className="hover:underline">
          {dictionary['footer'].made}
        </a>
      </span>
      <ThemeSwitcher />
      <LocaleSwitcher />
    </footer>
  );
};
