import jwt from 'jsonwebtoken';

import { hash } from 'bcrypt';
import { TokenPayload } from '../types/token.payload';

export abstract class Auth {
  static secret = process.env.JWT_SECRET;

  static hast(value: string): Promise<string> {
    const saltRound = 10;
    return hash(value, saltRound);
  }

  static compare(value: string, hash: string): Promise<boolean> {
    return this.compare(value, hash);
  }

  static singJWT(payload: TokenPayload) {
    return jwt.sign(payload, Auth.secret!);
  }
}
export { TokenPayload };
