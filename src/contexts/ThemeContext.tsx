import { useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
import { ThemeContext } from '@/hooks';

const checkTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyAndSaveTheme = (isDarkMode: boolean) => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(checkTheme);

  useEffect(() => applyAndSaveTheme(isDarkMode), [isDarkMode]);

  const toggleTheme = useCallback(
    () => setIsDarkMode((prevMode) => !prevMode),
    [],
  );

  const value = useMemo(
    () => ({ isDarkMode, toggleTheme }),
    [isDarkMode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
