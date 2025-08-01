export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  username: string;
  email: string;
  id: number;
  role: UserRole;
}
