import * as loginSchema from './login.schema';
import * as registerSchema from './register.schema';

export const authSchema = { ...loginSchema, ...registerSchema };
