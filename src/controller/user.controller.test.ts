import { Request, Response, NextFunction } from 'express';
import { UserController } from './user.controller';
import { UserMongoRepo } from '../repo/users/user.mongo.repo';
import { User } from '../entities/users';

jest.mock('../services/auth');

describe('Given FilmsController class', () => {
  let controller: UserController;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNext: NextFunction;
  let mockRepo: jest.Mocked<UserMongoRepo>;

  beforeAll(() => {
    mockRequest = {
      body: {},
      params: {},
      query: { key: 'value' },
    } as unknown as Request;
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    mockNext = jest.fn();
  });

  beforeEach(() => {
    mockRepo = {
      getById: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      login: jest.fn().mockResolvedValue({}),
    } as unknown as jest.Mocked<UserMongoRepo>;

    controller = new UserController(mockRepo);
  });

  describe('When we instantiate it without errors', () => {
    test('Then login should return user data and token for a valid user', async () => {
      const mockRequestWithUserId = {
        body: { userId: 'someUserId' },
        params: {},
        query: { key: 'value' },
      } as unknown as Request;
      const mockResponseWithUserId = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      await controller.login(
        mockRequestWithUserId,
        mockResponseWithUserId,
        mockNext
      );
      expect(mockResponseWithUserId.json).toHaveBeenCalled();
    });

    test('Then login should successfully authenticate with valid credentials and return user data and token', async () => {
      const mockRequest = {
        body: {
          email: 'test@example.com',
          password: 'passwd123',
        },
      } as unknown as Request;

      const mockUser = {
        email: 'TestName',
        password: 'test123',
      } as unknown as User;
      mockRepo.login.mockResolvedValueOnce(mockUser);
      await controller.login(mockRequest, mockResponse, mockNext);

      expect(mockRepo.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'passwd123',
      });
      expect(mockResponse.status).toHaveBeenCalledWith(202);
      expect(mockResponse.json).toHaveBeenCalledWith({
        user: mockUser,
      });
    });

    test('Then register (create) should create a new user with valid input data and image file', async () => {
      const mockRequest = {
        file: {
          path: 'valid/path/to/image.jpg',
        },
        body: {},
      } as unknown as Request;

      const mockNext = jest.fn();
      const mockRepo = {
        create: jest.fn(),
      } as unknown as UserMongoRepo;

      const controller = new UserController(mockRepo);
      const mockImageData = { url: 'https://example.com/image.jpg' };
      const mockCloudinaryService = {
        uploadImage: jest.fn().mockResolvedValue(mockImageData),
      };

      controller.cloudinaryService = mockCloudinaryService;

      await controller.create(mockRequest, mockResponse, mockNext);

      expect(mockCloudinaryService.uploadImage).toHaveBeenCalledWith(
        mockRequest.file?.path
      );
      expect(mockRequest.body.avatar).toBe(mockImageData);
    });
  });

  describe('When we instantiate it with errors', () => {
    let mockError: Error;
    beforeEach(() => {
      mockError = new Error('Invalid multer file');
      const mockRepo = {
        login: jest.fn().mockRejectedValue(mockError),
        create: jest.fn().mockRejectedValue(mockError),
      } as unknown as UserMongoRepo;

      controller = new UserController(mockRepo);
    });
    test('Then login should throw an error', async () => {
      await controller.login(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
    test('Then register (create) should throw an error', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
