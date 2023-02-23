import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { config } from "../../config";

export const isSwaggerAllowedToServe = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!config.get("swaggerDocs.swaggerEnvs").includes(config.get("env"))) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: ReasonPhrases.FORBIDDEN });
  }
  return next();
};
