/* eslint-disable camelcase */
import { MediaFiles } from './media.files.js';
import { HttpError } from '../types/http.error';
import { v2 as cloudinary } from 'cloudinary';
describe('Given MediaFiles class', () => {
  describe('When we force an error', () => {
    const mediaFiles = new MediaFiles();

    test('Then uploadImage should reject with TypeError', async () => {
      await expect(mediaFiles.uploadImage('')).rejects.toThrow(HttpError);
    });
  });
});

describe('Given MediaFiles class', () => {
  describe('When we use its methods with a valid imagePath', () => {
    const mediaFiles = new MediaFiles();
    mediaFiles.uploadImage = jest.fn().mockResolvedValue({});
    test('Then uploadImage should resolve with ImgData on successful upload', async () => {
      const imagePath = 'valid/image/path.jpg';
      const uploadApiResponse = {
        url: 'https://example.com/image.jpg',
        public_id: 'public_id',
        bytes: 1000,
        height: 500,
        width: 500,
        format: 'jpg',
      };
      cloudinary.uploader.upload = jest
        .fn()
        .mockResolvedValue(uploadApiResponse);
      const mediaFiles = new MediaFiles();
      const result = await mediaFiles.uploadImage(imagePath);
      expect(cloudinary.uploader.upload).toHaveBeenCalledWith(imagePath, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
      expect(result).toEqual({
        url: 'https://example.com/image.jpg',
        publicId: 'public_id',
        size: 1000,
        height: 500,
        width: 500,
        format: 'jpg',
      });
    });
  });
});
