import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
/* Tem import { FootballerMongoRepo } from '../repo/footballers/footballers.mongo.repo.js'; */

/* Y.M import { FootballersMongoRepo } from '../repo/footballers/footballers.mongo.repo.js'; */

const debug = createDebug('W9E:auth:interceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated');
  }

  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('Authorization');
      if (!tokenHeader?.startsWith('Bearer'))
        throw new HttpError(401, 'Unauthorized');
      const token = tokenHeader.split(' ')[1];

      const tokenPayload = Auth.verifyAndGetPayload(token);
      req.body.userId = tokenPayload.id;

      req.body.roleOfTheUser = tokenPayload.role;
      next();
    } catch (error) {
      next(error);
    }
  }

  /*  Tem async authentificationFootballers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // eslint-disable-next-line prefer-destructuring
      const userId = req.body.userId;
      const footballersId = req.params.id;
      const repo = new FootballerMongoRepo();
      const footballers = await repo.getById(footballersId);
      if (footballers.author.id !== userId)
        throw new HttpError(401, 'Unauthorized', 'User not valid');
      next();
    } catch (error) {
      next(error);
    }
  } */

  async adminValidationForRoleOfTheUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (req.body.roleOfTheUser !== 'Admin')
        throw new HttpError(403, 'Forbidden', 'Not acceptable'); // Para que solo el Admin pueda borrar.
      next();
    } catch (error) {
      next(error);
    }
  }
}
