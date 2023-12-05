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
      req.body.autor = { id: req.body.userId };
      if (!req.file) throw new HttpError(406, 'Not acceptable', 'Invalid File');
      const imgData = await this.cloudinaryService.uploadImage(req.file.path);
      req.body.imageFootballer = imgData;
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
