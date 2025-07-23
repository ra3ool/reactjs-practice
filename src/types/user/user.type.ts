import { UserRole } from '../routing';

export interface User {
  username: string;
  email: string;
  id: number;
  roles?: UserRole[];
}
