export enum IdentifierType {
  EMAIL = 'email',
  USERNAME = 'username',
}
export interface LoginFormData {
  identifier: string; // email or username
  password: string;
  remember: boolean;
}

export type LoginRequestPayload = {
  password: string;
  remember: boolean;
} & ({ email: string; username?: never } | { username: string; email?: never });

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
