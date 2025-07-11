export interface Storage {
  set(key: string, value: string, options?: object): void;
  get(key: string): string | null | undefined;
  remove(key: string): void;
  clear?(): void;
}
