import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchErrors } from '../catchErrors';

export const validateRoute = (schema: any, reqValidateField = 'body', options = {}) => {
  return catchErrors(async (req: any, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[reqValidateField], options);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: error.details });
    }
    // add validated data to req object
    req['validData'] = Array.isArray(req['validData']) ? [...req['validData'], ...[value]] : [value];
    return next();
  });
};
