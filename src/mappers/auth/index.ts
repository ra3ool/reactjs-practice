import * as loginMappers from './login.mapper';
import * as registerMappers from './register.mapper';

export const authMappers = { ...loginMappers, ...registerMappers };
