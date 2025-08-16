import { cryptoSerializer } from '@/lib';
import { PersistStorage, StorageValue } from 'zustand/middleware';

const cryptoStorage = <T>(secret: string): PersistStorage<T> => {
  const { serialize, deserialize } = cryptoSerializer(secret);

  return {
    getItem: (name): StorageValue<T> | null => {
      const raw = localStorage.getItem(name);
      if (!raw) return null;
      try {
        return deserialize(raw) as StorageValue<T>;
      } catch {
        return null;
      }
    },
    setItem: (name, value) => {
      const encrypted = serialize(value);
      localStorage.setItem(name, encrypted);
    },
    removeItem: (name) => {
      localStorage.removeItem(name);
    },
  };
};

export default cryptoStorage;
