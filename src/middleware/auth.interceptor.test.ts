import { AuthInterceptor } from './auth.interceptor.js';
import { NextFunction, Request, Response } from 'express';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';

/* Tem import { FootballersMongoRepo } from '../repo/footballers/footballers.mongo.repo.js'; */

jest.mock('../services/auth.js');
jest.mock('../repo/footballers/footballers.mongo.repo.js');
describe('Given the Class AuthInterceptor...', () => {
  let authInterceptor: AuthInterceptor;

  describe('When we instantiate it', () => {
    beforeEach(() => {
      authInterceptor = new AuthInterceptor();
    });
    test('Then it should be...', () => {
      const mockRequest = {
        get: jest.fn(() => 'Bearer validtoken'),
        body: {},
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn() as NextFunction;

      const mockPayload = { id: '122334', role: 'user' };

      authInterceptor.authorization(mockRequest, mockResponse, mockNext);

      (Auth.verifyAndGetPayload as jest.Mock).mockReturnValue(mockPayload);

      expect(Auth.verifyAndGetPayload).toHaveBeenCalledWith('validtoken');
      expect(mockPayload).toStrictEqual({ id: '122334', role: 'user' });
      expect(mockNext).toHaveBeenCalled();
    });

    test('Then it should be...', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue(null),
        body: {},
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn() as NextFunction;

      const mockPayload = { id: '122334', role: 'User' };

      authInterceptor.authorization(mockRequest, mockResponse, mockNext);

      (Auth.verifyAndGetPayload as jest.Mock).mockReturnValue(mockPayload);

      expect(mockNext).toHaveBeenCalledWith(expect.any(HttpError));
    });

    describe('When it is instantiated', () => {
      const req = {
        body: {
          id: 'user1',
        },
        params: {
          id: 'user1',
        },
      } as unknown as Request;
      const res = {} as unknown as Response;
      const next = jest.fn() as NextFunction;
      const interceptor = new AuthInterceptor();
      test('Then it should call next middleware function when user IDs match', async () => {
        await interceptor.authentificationFootballers(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
