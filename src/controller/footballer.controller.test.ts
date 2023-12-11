import { NextFunction, Request, Response } from 'express';
import { FootballerController } from './footballer.controller';
import { FootballersMongoRepo } from '../repo/footballers/footballers.mongo.repo';

describe('Given FootballerController Class...', () => {
  let controller: FootballerController;

  let mockRequest: Request;
  let mockResponse: Response;

  let mockNext: NextFunction;
  let mockRepo: jest.Mocked<FootballersMongoRepo>;

  beforeAll(() => {
    mockRequest = {
      body: {},
      params: {},
    } as unknown as Request;

    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    mockNext = jest.fn();
  });

  beforeEach(() => {
    mockRepo = {
      create: jest.fn().mockResolvedValue({}),
      getById: jest.fn().mockResolvedValue({}),
      getAll: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
    } as unknown as jest.Mocked<FootballersMongoRepo>;
    controller = new FootballerController(mockRepo);
  });

  describe('When we create a new footballer', () => {
    test('Then the create method should create a new footballer with the proper info and the right image...', async () => {
      const mockRequest = {
        file: {
          path: 'valid/path/to/image.jpg',
        },
        body: {},
      } as unknown as Request;

      const mockNext = jest.fn();
      const mockRepo = {
        create: jest.fn(),
      } as unknown as FootballersMongoRepo;

      const controller = new FootballerController(mockRepo);
      const mockImageData = { url: 'https://example.com/image.jpg' };
      const mockCloudinaryService = {
        uploadImage: jest.fn().mockResolvedValue(mockImageData),
      };

      controller.cloudinaryService = mockCloudinaryService;

      await controller.create(mockRequest, mockResponse, mockNext);

      expect(mockCloudinaryService.uploadImage).toHaveBeenCalledWith(
        mockRequest.file?.path
      );
      expect(mockRequest.body.imageFootballer).toBe(mockImageData);
    });
  });

  describe('When we instantiate it with errors', () => {
    let mockError: Error;
    beforeEach(() => {
      mockError = new Error('Invalid File');
      const mockRepo = {
        create: jest.fn().mockRejectedValue(mockError),
      } as unknown as FootballersMongoRepo;

      controller = new FootballerController(mockRepo);
    });

    test('Then create should throw an error', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
