import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { UserMongoRepo } from '../repo/users/user.mongo.repo.js';
import { Auth } from '../services/auth.js';
import { Controller } from './controller.js';
import { User } from '../entities/user.js';
import { HttpError } from '../types/http.error.js';
import { LoginResponse } from '../types/login.response.js';

const debug = createDebug('w7E:user:controller');

export class UserController extends Controller<User> {
  constructor(protected repo: UserMongoRepo) {
    super(repo);
    // Inyección de dependenncias. Desacoplamos el controler de un repo concreto.
    debug('Instatiated');
  }

  async loginWithToken(req: Request, res: Response, next: NextFunction) {
    try {
      const result = this.repo.getById(req.body.userId);
      res.json(result);
      res.status(202);
      res.statusMessage = 'Accepted';
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = req.body.userId
        ? await this.repo.getById(req.body.userId)
        : await this.repo.login(req.body);
      const data: LoginResponse = {
        user: result,
        token: Auth.signJWT({
          id: result.id,
          userName: result.userName,
          role: result.role,
        }),
      };

      res.status(202);
      res.statusMessage = 'Accepted';
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new HttpError(406, 'Not acceptable', 'Invalid File');

      const imgData = await this.cloudinaryService.uploadImage(req.file.path);

      req.body.avatar = imgData;
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
