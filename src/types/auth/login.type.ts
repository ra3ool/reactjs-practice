export interface LoginFormData {
  identifier: string; // email or username
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}
