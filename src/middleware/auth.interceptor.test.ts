import { AuthInterceptor } from './auth.interceptor.js';
import { NextFunction, Request, Response } from 'express';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
/* Tem import { FootballersMongoRepo } from '../repo/footballers/footballers.mongo.repo.js'; */

jest.mock('../services/auth.js');
jest.mock('../repo/footballers/footballers.mongo.repo.js');
describe('Given the Class AuthInterceptor...', () => {
  let authInterceptor: AuthInterceptor;
  /*  Tem  let req: Request;
  let res: Response;
  let next: NextFunction; */

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

    /* Tem describe('When we use authenticationCars method', () => {
      beforeEach(() => {
        req.body = { userId: 'userId' };
        req.params = { id: 'footballerId' };
      });

      test('Then should call next when the user is the author of the car', async () => {
        const mockFootballer = { author: { id: 'userId' } };
        const mockFootballerMongoRepoInstance = {
          getById: jest.fn().mockResolvedValue(mockFootballer),
        };

        jest
          .spyOn(FootballersMongoRepo.prototype, 'getById')
          .mockImplementation(mockFootballerMongoRepoInstance.getById);

        await authInterceptor.authentificationFootballers(req, res, next);

        expect(mockFootballerMongoRepoInstance.getById).toHaveBeenCalledWith(
          'footballerId'
        );
        expect(next).toHaveBeenCalled();
      }); */

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
