import { AuthInterceptor } from './auth.interceptor.js';
import { NextFunction, Request, Response } from 'express';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error';

jest.mock('../services/auth.js');
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

    /* Tem  test('Then it should be...', () => {
      const mockRequest = {
        body: {
          roleOfTheUser: 'Admin',
        },
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn() as NextFunction;

      authInterceptor.adminValidationForRoleOfTheUser(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });

    test('Then it should be...', () => {
      const mockRequest = {
        body: {
          roleOfTheUser: 'User',
        },
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn() as NextFunction;

      authInterceptor.adminValidationForRoleOfTheUser(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(HttpError));
    }); */
  });
});
