import '@shared/container';
import 'express-async-errors';
import '@shared/typeorm';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import uploadConfig from '@config/upload';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import { logRoutes } from './middlewares/logRoutes';
import { errorHandling } from './middlewares/errorHandling';

const app = express();

app.use(cors());
app.use(express.json());

app.use(logRoutes);
app.use(rateLimiter);

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());
app.use(errorHandling);

export { app };
