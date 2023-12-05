import { Auth, TokenPayload } from './auth';
import { /*  compare, */ hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt'); // Todas las funciones mockeadas devuelven undefined
jest.mock('jsonwebtoken');

describe('Given Auth abstract class', () => {
  describe('When se use its methods', () => {
    test('Then hash should ...', () => {
      // Arrange
      (hash as jest.Mock).mockReturnValue('test');
      const mockValue = '';
      // Act
      const result = Auth.hast(mockValue);
      // Assert
      expect(hash).toHaveBeenCalled();
      expect(result).toBe('test');
    });

    /*  Tem test.only('then compare should..', () => {
      (compare as jest.Mock).mockReturnValue(true);
      const mockValue = '';
      const mockHash = 'hash';
      const result = Auth.compare(mockValue, mockHash);
      expect(compare).toHaveBeenCalled();
      expect(result).toBe(true);
    }); */

    test('Then signJW has should...', () => {
      jwt.sign = jest.fn().mockReturnValue('test');
      const result = Auth.singJWT('' as unknown as TokenPayload);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe('test');
    });
  });
});
