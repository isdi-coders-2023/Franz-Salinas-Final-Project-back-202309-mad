import { User } from '../entities/users';

export type LoginResponse = {
  user: User;
  token: string;
};
