import { Request, Response } from 'express';
import { FileInterceptor } from './file.interceptor.js';
import multer from 'multer';

jest.mock('multer');
describe('Given Class FileInterceptor...', () => {
  // Given
  const midlewareMock = jest.fn();
  const single = jest.fn().mockReturnValue(midlewareMock);
  const fields = jest.fn().mockReturnValue(midlewareMock);
  multer.diskStorage = jest
    .fn()
    .mockImplementation(({ filename }) => filename('', '', () => {}));
  (multer as unknown as jest.Mock).mockReturnValue({ single, fields });

  describe('When we instantiate', () => {
    const interceptor = new FileInterceptor();
    // When

    test('Then it should be...', () => {
      interceptor.singleFileStore()({} as Request, {} as Response, jest.fn());
      expect(multer.diskStorage).toHaveBeenCalled();
      expect(single).toHaveBeenCalled();
      expect(midlewareMock).toHaveBeenCalled();
    });

    test('Then multiFileStore should be used with default fileSize', () => {
      interceptor.multiFileStore()({} as Request, {} as Response, jest.fn());
      expect(multer.diskStorage).toHaveBeenCalled();
      expect(fields).toHaveBeenCalled();
      expect(midlewareMock).toHaveBeenCalled();
    });

    test('Then multiFileStore should be used with custom fileSize', () => {
      const customFileSize = 10_000_000;
      interceptor.multiFileStore(customFileSize)(
        {} as Request,
        {} as Response,
        jest.fn()
      );
      expect(multer.diskStorage).toHaveBeenCalled();
      expect(fields).toHaveBeenCalled();
      expect(midlewareMock).toHaveBeenCalled();
    });
  });
});
