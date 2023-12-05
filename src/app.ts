import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
/*  Tem  import { footballersRouter } from './router/footballers.router.js'; */
import createDebug from 'debug';
import { userRouter } from './router/user.router.js';
import { errorMiddleware } from './middleware/error.middleware.js';

/* Tem import { errorMiddleware } from './middleware/error.middleware.js';  */

const debug = createDebug('W9E:footballers:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRouter);

app.use(errorMiddleware);
