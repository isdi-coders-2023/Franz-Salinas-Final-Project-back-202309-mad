/* eslint-disable dot-notation */
import { NextFunction, Request, Response } from 'express';

import createDebug from 'debug';
import { Repository } from '../repo/repo.js';
import { Footballer } from '../entities/footballers.js';
import { Controller } from './controller.js';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('W7E:footballers:controller');

export class FootballerController extends Controller<Footballer> {
  constructor(protected repo: Repository<Footballer>) {
    super(repo);

    // Inyección de dependenncias. Desacoplamos el controler de un repo concreto.
    debug('Instatiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.author = { id: req.body.userId };

      if (!req.files)
        throw new HttpError(406, 'Not Acceptable', 'Invalid multer files');

      // eslint-disable-next-line no-undef
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const image = await this.cloudinaryService.uploadImage(
        // eslint-disable-next-line dot-notation
        files['imageFootballer'][0].path
      );
      const collectionsImage = await this.cloudinaryService.uploadImage(
        files['teamShieldFlag'][0].path
      );
      const caseImage = await this.cloudinaryService.uploadImage(
        files['countryFlag'][0].path
      );

      req.body.imageFootballer = image;
      req.body.teamShieldFlag = collectionsImage;
      req.body.countryFlag = caseImage;

      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
