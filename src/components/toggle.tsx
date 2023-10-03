'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div role="status" className="max-w-sm animate-pulse flex align-center">
        <div className="ml-3 w-8 h-8 text-2xl rounded-full hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]"></div>
      </div>
    );
  }

  return (
    <div
      className="rounded-full flex border border-slate-200 p-1"
      role="switch"
      aria-checked={theme === 'light'}
    >
      <MoonIcon
        className={`hover:cursor-pointer rounded-full p-1 mr-1 w-5 h-5 text-xl dark:text-black hover:scale-110 active:scale-100 duration-200 ${
          theme === 'dark' ? 'bg-slate-200' : ''
        }`}
        onClick={() => setTheme('dark')}
      >
        <span className="sr-only">Light mode</span>
      </MoonIcon>
      <SunIcon
        className={`hover:cursor-pointer rounded-full p-[2px] w-5 h-5 text-xl hover:scale-110 active:scale-100 duration-200 ${
          theme === 'light' ? 'bg-slate-200' : ''
        }`}
        onClick={() => setTheme('light')}
      >
        <span className="sr-only">Dark mode</span>
      </SunIcon>
    </div>
  );
};
