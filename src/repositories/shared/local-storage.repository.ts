import { localStorage as localStorageClient } from '@/clients';
import { Storage } from '@/interfaces';

class LocalStorage implements Storage {
  set(key: string, value: string) {
    localStorageClient.setItem(key, value);
  }
  get(key: string) {
    return localStorageClient.getItem(key);
  }
  remove(key: string) {
    localStorageClient.removeItem(key);
  }
  clear() {
    localStorageClient.clear();
  }
}

export default new LocalStorage();
