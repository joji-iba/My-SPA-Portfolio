// ダークモードの実装
import { useEffect, useState } from 'react';

export const useThemeSwitcher = () => {
  const preferDarkQuery = '(prefer-color-scheme: dark)';
  const [mode, setMode] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const userPref = window.localStorage.getItem('theme');

    const handleChange = () => {
      if (userPref) {
        const check = userPref === 'dark' ? 'dark' : 'light';
        setMode(check);
        if (check === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        const check = mediaQuery.matches ? 'dark' : 'light';
        setMode(check);
        window.localStorage.setItem('theme', check);
        if (check === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    handleChange();

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // localSrtorageのthemeへdarkを格納/排除切替
  useEffect(() => {
    if (mode === 'dark') {
      window.localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
    if (mode === 'light') {
      window.localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return [mode, setMode];
};
