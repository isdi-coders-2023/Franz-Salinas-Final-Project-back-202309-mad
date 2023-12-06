import { User } from '../entities/users';
import jwt from 'jsonwebtoken';

export type TokenPayload = {
  id: User['id'];
  email: string;
  role: User['role'];
} & jwt.JwtPayload;
