import express, { Application } from 'express';
import { router } from './router';
import { response } from './utils/middleware';

export const app: Application = express();


app.use(response);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use('/v1', router);

