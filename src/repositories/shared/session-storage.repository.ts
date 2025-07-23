import { sessionStorage as sessionStorageClient } from '@/clients';
import { Storage } from '@/types';

class SessionStorage implements Storage {
  set(key: string, value: string) {
    sessionStorageClient.setItem(key, value);
  }
  get(key: string) {
    return sessionStorageClient.getItem(key);
  }
  remove(key: string) {
    sessionStorageClient.removeItem(key);
  }
  clear() {
    sessionStorageClient.clear();
  }
}

export default new SessionStorage();
