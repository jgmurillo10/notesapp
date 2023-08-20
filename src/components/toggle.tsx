'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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
    <button
      className={`ml-3 w-8 h-8 text-2xl rounded-full hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'light' ? '🌛' : '☀️'}
    </button>
  );
};
