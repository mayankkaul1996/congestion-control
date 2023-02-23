import { Request, Response, Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { swaggerServer, swaggerDocs, isSwaggerAllowedToServe } from './utils/swaggerDocs';

import {
  calculatorRouter
} from './entities';

export const router = Router({ mergeParams: true });

router.get('/ping', (req: Request, res: Response) => {
  res.sendJson(StatusCodes.OK, { success: true });
});

router.use('/api-docs', isSwaggerAllowedToServe, swaggerServer, swaggerDocs);
router.use('/calculator', calculatorRouter);

//TODO: improve routing so 404 is not protected
router.all('*', (req: Request, res: Response) => {
  res.sendJson(StatusCodes.NOT_FOUND, { error: ReasonPhrases.NOT_FOUND });
});
