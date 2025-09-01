import { createApiClient } from '@/clients';

export const authClient = createApiClient({
  timeout: 15000,
});
