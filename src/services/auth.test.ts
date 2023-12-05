import { Auth, TokenPayload } from './auth';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Given Auth abstract class', () => {
  describe('When we use its methods without errors', () => {
    test('Then hash should...', () => {
      (hash as jest.Mock).mockReturnValue('test');
      const mockValue = '';
      const result = Auth.hast(mockValue);
      expect(hash).toHaveBeenCalled();
      expect(result).toBe('test');
    });

    test('Then compare should...', () => {
      (compare as jest.Mock).mockReturnValue(true);
      const mockValue = '';
      const result = Auth.compare(mockValue, mockValue);
      expect(compare).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    test('Then signJWT should...', () => {
      jwt.sign = jest.fn().mockReturnValue('test');
      const result = Auth.singJWT({} as TokenPayload);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe('test');
    });

    test('Then verifyAndGetPayload should...', () => {
      jwt.verify = jest.fn().mockReturnValue({});
      const result = Auth.verifyAndGetPayload('');
      expect(jwt.verify).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });
  });
  describe('When we use its methods with errors', () => {
    // Cómo testear un error síncrono
    test('Then verifyAndGetPayload should...', () => {
      jwt.verify = jest.fn().mockReturnValue('');
      expect(() => Auth.verifyAndGetPayload('')).toThrow();
      expect(jwt.verify).toHaveBeenCalled();
    });
  });
});
