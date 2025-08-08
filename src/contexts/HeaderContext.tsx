import { createContext, useContext } from 'react';

interface HeaderContextType {
  setHeaderTitle: (title: string) => void;
}

export const HeaderContext = createContext<HeaderContextType>({
  setHeaderTitle: () => {},
});

export const useHeader = () => useContext(HeaderContext);
