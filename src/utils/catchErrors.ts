import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface ExposableErrorModel {
  status?: number;
  message: string;
  code?: string;
}

export class ExposableError extends Error {
  public status?: number;
  public code?: string;
  public details?: any;

  constructor(err: ExposableErrorModel, details?: any) {
    super(err.message);
    this.status = err.status;
    this.code = err.code;
    this.details = details;
  }
}

export interface ErrorLibrary {
  [field: string]: ExposableErrorModel;
}

export const catchErrors = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch((err) => {
      // TODO: here we can process our errors plus add error logging like sentry
      return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: err.message,
        code: err.code || null,
        details: err.details || null,
      });
    });
  };
};
