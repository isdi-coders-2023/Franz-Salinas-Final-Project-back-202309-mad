/* eslint-disable dot-notation */
import { NextFunction, Request, Response } from 'express';

import createDebug from 'debug';
import { Repository } from '../repo/repo.js';
import { Footballer } from '../entities/footballers.js';
import { Controller } from './controller.js';
import { HttpError } from '../types/http.error.js';
import { FootballerModel } from '../repo/footballers/footballers.mongo.model.js';

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
        files['imageFootballer'][0].path
      );
      const teamShieldFlag = await this.cloudinaryService.uploadImage(
        files['teamShieldFlag'][0].path
      );
      const countryFlag = await this.cloudinaryService.uploadImage(
        files['countryFlag'][0].path
      );
      const detailsImage = await this.cloudinaryService.uploadImage(
        files['detailsImage'][0].path
      );

      req.body.imageFootballer = image;
      req.body.teamShieldFlag = teamShieldFlag;
      req.body.countryFlag = countryFlag;
      req.body.detailsImage = detailsImage;

      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const existingItem = await FootballerModel.findById(req.params.id);
      const existingImageFootballer = existingItem!.imageFootballer;
      const existingDetailsImage = existingItem!.detailsImage;
      const existingCountryFlag = existingItem!.countryFlag;
      const existingTeamShield = existingItem!.teamShieldFlag;

      if (!req.files)
        throw new HttpError(406, 'Not acepptable', 'Invalid multer files');

      // eslint-disable-next-line no-undef
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const imageFootballer =
        files['imageFootballer'] && files['imageFootballer'][0]?.path
          ? await this.cloudinaryService.uploadImage(
              files['imageFootballer'][0].path
            )
          : existingImageFootballer;
      const detailsImage =
        files['detailsImage'] && files['detailsImage'][0]?.path
          ? await this.cloudinaryService.uploadImage(
              files['detailsImage'][0].path
            )
          : existingDetailsImage;

      const countryFlag =
        files['countryFlag'] && files['countryFlag'][0]?.path
          ? await this.cloudinaryService.uploadImage(
              files['countryFlag'][0].path
            )
          : existingCountryFlag;
      const teamShield =
        files['teamShieldFlag'] && files['teamShieldFlag'][0]?.path
          ? await this.cloudinaryService.uploadImage(
              files['teamShieldFlag'][0].path
            )
          : existingTeamShield;

      req.body.imageFootballer = imageFootballer;
      req.body.detailsImage = detailsImage;
      req.body.countryFlag = countryFlag;
      req.body.teamShieldFlag = teamShield;

      super.update(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
