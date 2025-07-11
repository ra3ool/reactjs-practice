import { cookieStorage as cookieStorageClient } from '@/clients';
import { Storage } from '@/interfaces';

class CookieStorage implements Storage {
  set(key: string, value: string, options: object) {
    cookieStorageClient.set(key, value, options);
  }
  get(key: string): string | null | undefined {
    return cookieStorageClient.get(key);
  }
  remove(key: string) {
    cookieStorageClient.remove(key);
  }
}

export default new CookieStorage();
