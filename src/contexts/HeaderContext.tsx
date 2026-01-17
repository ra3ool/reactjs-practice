import { createContext, useContext } from 'react';

interface HeaderContextType {
  setHeaderTitle: (title: string) => void;
}

export const HeaderContext = createContext<HeaderContextType>({
  setHeaderTitle: () => {},
});

export const useHeader = () => {
  const ctx = useContext(HeaderContext);
  if (!ctx) {
    throw new Error('Header must be used inside CustomDropdown');
  }
  return ctx;
};
