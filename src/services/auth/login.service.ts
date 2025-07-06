import { LoginFormData } from '@/types';
import axios from 'axios';
import { loginForm } from '@/schemas';

const baseUrl = import.meta.env.VITE_AUTH_BASE_URL;

const loginUser = async (data: LoginFormData) => {
  // Validate request
  const validData = loginForm.requestSchema.parse(data);
  const response = await axios.post(`${baseUrl}/auth/signin`, validData);
  // Validate response
  return loginForm.responseSchema.parse(response.data);
};

export default loginUser;
