import jwt from 'jsonwebtoken';

import { hash, compare } from 'bcrypt';
import { TokenPayload } from '../types/token.payload';
import { HttpError } from '../types/http.error.js';

export abstract class Auth {
  static secret = process.env.JWT_SECRET;

  static hast(value: string): Promise<string> {
    const saltRound = 10;
    return hash(value, saltRound);
  }

  static compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }

  static singJWT(payload: TokenPayload) {
    return jwt.sign(payload, Auth.secret!);
  }

  static verifyAndGetPayload(token: string) {
    try {
      const result = jwt.verify(token, Auth.secret!);
      if (typeof result === 'string')
        throw new HttpError(498, 'Invalid Token', result);
      return result as TokenPayload;
    } catch (error) {
      throw new HttpError(498, 'Invalid Token', (error as Error).message);
    }
  }
}
export { TokenPayload };
