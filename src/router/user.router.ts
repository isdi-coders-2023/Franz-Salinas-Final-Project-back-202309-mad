import { Router as createRouter } from 'express';

import { UserController } from '../controller/user.controller.js';
import createDebug from 'debug';
import { UserMongoRepo } from '../repo/users/user.mongo.repo.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W9E:user:router');

export const userRouter = createRouter();
debug('Starting');

const repo = new UserMongoRepo();
const controller = new UserController(repo);
const fileInterceptor = new FileInterceptor();
const interceptor = new AuthInterceptor();

userRouter.get('/', controller.getAll.bind(controller));

userRouter.post(
  '/register',
  fileInterceptor.singleFileStore('avatar').bind(fileInterceptor),
  controller.create.bind(controller)
);

userRouter.post('/login', controller.login.bind(controller));

userRouter.patch(
  '/login',
  interceptor.authorization.bind(interceptor),

  controller.login.bind(controller)
);

userRouter.delete('/delete/:id', controller.delete.bind(controller));
