export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export type RegisterRequestPayload = Omit<RegisterFormData, 'confirmPassword'>;
