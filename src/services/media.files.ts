/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import createDebug from 'debug';
import { ImgData } from '../types/img.data.js';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('W7E:mediaFiles');

export class MediaFiles {
  constructor() {
    cloudinary.config({
      api_key: '146911668662783',
      cloud_name: 'dnlkezvzv',
      api_secret: 'dM-HbnhuIUiw65-bQspItdfeEXk',

      secure: true,
    });

    debug('Instatiated');
  }

  async uploadImage(imagePath: string) {
    try {
      console.log(imagePath);
      const uploadApiResponse = await cloudinary.uploader.upload(imagePath, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      const imgData: ImgData = {
        url: uploadApiResponse.url,
        publicId: uploadApiResponse.public_id,
        size: uploadApiResponse.bytes,
        height: uploadApiResponse.height,
        width: uploadApiResponse.width,
        format: uploadApiResponse.format,
      };

      return imgData;
    } catch (err) {
      const error = (err as { error: Error }).error as Error;

      throw new HttpError(406, 'Not accepable', error.message);
    }
  }
}
