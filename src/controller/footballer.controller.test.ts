import { NextFunction, Request, Response } from 'express';
import { FootballerController } from './footballer.controller';
import { FootballersMongoRepo } from '../repo/footballers/footballers.mongo.repo';
import { FootballerModel } from '../repo/footballers/footballers.mongo.model';
import { HttpError } from '../types/http.error';

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
      query: { key: 'value' },
      file: {
        path: 'valid/path/to/imageFootballer.jpg',
      },
    } as unknown as Request;

    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      statusMessage: 'Updated',
    } as unknown as Response;
    mockNext = jest.fn();
  });

  beforeEach(() => {
    mockRepo = {
      create: jest.fn().mockResolvedValue({}),
      getById: jest.fn().mockResolvedValue({}),
      search: jest.fn().mockResolvedValue({}),
      getAll: jest.fn().mockResolvedValue([{}]),
      delete: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue([{}]),
    } as unknown as jest.Mocked<FootballersMongoRepo>;
    controller = new FootballerController(mockRepo);
  });

  test('Then getAll should...', async () => {
    await controller.getAll(mockRequest, mockResponse, mockNext);
    expect(mockResponse.json).toHaveBeenCalledWith([{}]);
  });

  test('Then getById should...', async () => {
    await controller.getById(mockRequest, mockResponse, mockNext);
    expect(mockResponse.json).toHaveBeenCalledWith({});
  });

  test('Then search should...', async () => {
    await controller.search(mockRequest, mockResponse, mockNext);
    expect(mockResponse.json).toHaveBeenCalledWith([{}]);
  });

  describe('When we create a new footballer', () => {
    test('Then the create method should create a new footballer with the proper info and the right image...', async () => {
      const mockRequest = {
        files: {
          imageFootballer: [{ path: 'valid/path/to/image.jpg' }],

          teamShieldFlag: [{ path: 'valid/path/to/teamShieldFlag.jpg' }],

          countryFlag: [{ path: 'valid/path/to/countryFlag.jpg' }],

          detailsImage: [{ path: 'valid/path/to/detailsImage.jpg' }],
        },

        body: { userId: '123' },
      } as unknown as Request;

      const mockNext = jest.fn();
      const mockRepo = {
        create: jest.fn(),
      } as unknown as FootballersMongoRepo;

      const controller = new FootballerController(mockRepo);
      const mockImageData = { url: 'https://example.com/image.jpg' };
      const mockTeamShield = {
        url: 'https://example.com/teamShieldFlag.jpg',
      };
      const mockDetailsImage = { url: 'https://example.com/detailsImage.jpg' };
      const mockCountryFlag = {
        url: 'https://example.com/countryFlag.jpg',
      };

      /* Tem  const mockExistingItem = {
        imageFootballer: { url: 'https://example.com/existingImage.jpg' },
        teamShieldFlag: 'https://example.com/existingTeamShieldFlag.jpg',
        countryFlag: 'https://example.com/existingCountryFlag.jpg',
        detailsImage: 'https://example.com/existingDetailsImage.jpg',
      }; */
      const mockCloudinaryService = {
        uploadImage: jest
          .fn()
          .mockResolvedValue(mockImageData)
          .mockResolvedValue(mockTeamShield)
          .mockResolvedValue(mockDetailsImage)
          .mockResolvedValue(mockCountryFlag),
      };

      controller.cloudinaryService = mockCloudinaryService;

      await controller.create(mockRequest, mockResponse, mockNext);

      expect(mockCloudinaryService.uploadImage).toHaveBeenCalled();
    });

    test('Then update should...', async () => {
      const mockRequest = {
        files: {
          imageFootballer: [{ path: 'valid/path/to/image.jpg' }],

          teamShieldFlag: [{ path: 'valid/path/to/teamShieldFlag.jpg' }],

          countryFlag: [{ path: 'valid/path/to/countryFlag.jpg' }],

          detailsImage: [{ path: 'valid/path/to/detailsImage.jpg' }],
        },

        body: { userId: 'someUserId' },
        params: {
          id: '1',
        },
      } as unknown as Request;

      const mockNext = jest.fn();
      const mockRepo = {
        create: jest.fn(),
      } as unknown as FootballersMongoRepo;

      const controller = new FootballerController(mockRepo);

      const mockImageData = { url: 'https://example.com/image.jpg' };
      const mockTeamShield = {
        url: 'https://example.com/teamShieldFlag.jpg',
      };
      const mockDetailsImage = { url: 'https://example.com/detailsImage.jpg' };
      const mockCountryFlag = {
        url: 'https://example.com/countryFlag.jpg',
      };

      const mockExistingItem = {
        imageFootballer: { url: 'https://example.com/existingImage.jpg' },
        teamShieldFlag: 'https://example.com/existingTeamShieldFlag.jpg',
        countryFlag: 'https://example.com/existingCountryFlag.jpg',
        detailsImage: 'https://example.com/existingDetailsImage.jpg',
      };

      const findByIdMock = jest.fn().mockResolvedValue(mockExistingItem);
      (FootballerModel.findById as jest.Mock) = findByIdMock;

      const mockCloudinaryService = {
        uploadImage: jest
          .fn()
          .mockResolvedValue(mockImageData)
          .mockResolvedValue(mockDetailsImage)
          .mockResolvedValue(mockTeamShield)
          .mockResolvedValue(mockCountryFlag),
      };

      controller.cloudinaryService = mockCloudinaryService;

      await controller.update(mockRequest, mockResponse, mockNext);

      expect(mockResponse.statusMessage).toBe('Created');
      expect(findByIdMock).toHaveBeenCalledWith(mockRequest.params.id);
      expect(mockCloudinaryService.uploadImage).toHaveBeenCalled();
    });

    describe('When we instantiate it with errors', () => {
      let mockError: Error;

      beforeEach(() => {
        mockError = new Error('Mock error');
        const mockRepo = {
          getAll: jest.fn().mockRejectedValue(mockError),
          getById: jest.fn().mockRejectedValue(mockError),
          search: jest.fn().mockRejectedValue(mockError),
          create: jest.fn().mockRejectedValue(new Error('Invalid multer file')),
          update: jest.fn().mockRejectedValue(mockError),
          delete: jest.fn().mockRejectedValue(mockError),
        } as unknown as FootballersMongoRepo;

        controller = new FootballerController(mockRepo);
      });
      test('Then getAll should throw an error', async () => {
        await controller.getAll(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });

      test('Then getById should throw an error', async () => {
        await controller.getById(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });

      test('Then search should throw an error', async () => {
        await controller.search(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });

      test('Then create should call next with an error if req.file is not defined', async () => {
        mockRequest.file = undefined;

        await controller.create(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(
          new HttpError(406, 'Not Acceptable', 'Invalid multer files')
        );
      });

      test('Then update should throw an error', async () => {
        mockRequest.file = undefined;

        await controller.update(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(
          new HttpError(406, 'Not Acceptable', 'Invalid multer files')
        );
      });

      test('Then delete should throw an error', async () => {
        await controller.delete(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });
    });

    /* Tem  describe('When we update a  footballer', () => {
      test('Then the update method should handle missing image files...', async () => {
        const mockRequest = {
          files: {
            imageFootballer: [{ path: 'undefined' }],

            teamShieldFlag: [{ path: 'undefined' }],

            countryFlag: [{ path: 'undefined' }],

            detailsImage: [{ path: 'undefined' }],
          },

          body: { userId: 'someUserId' },
          params: {
            id: '1',
          },
        } as unknown as Request;

        const mockRepo = {
          update: jest.fn(),
        } as unknown as FootballersMongoRepo;

        const controller = new FootballerController(mockRepo);

        await controller.update(mockRequest, mockResponse, mockNext);

        expect(mockRepo.update).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalled();
      });
    });
 */
    /* Tem describe('When we instantiate it with errors', () => {
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
  }); */
  });
});
