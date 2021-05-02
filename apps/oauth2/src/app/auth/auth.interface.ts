import { User } from '../schemas/user.schema';

export interface AuthenticationProvider {
  createUser(details: Omit<User, 'id'>);
  findUser(discordId: string);
  validateUser(details: Omit<User, 'id'>);
}
