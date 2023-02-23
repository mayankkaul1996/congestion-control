import { Request, Response, NextFunction } from 'express';
import contentDisposition from 'content-disposition';
import fs from 'fs';
import zlib from 'zlib';
import { middlewareErrorLib } from './error';
import { ExposableError } from '../../utils';
import { StatusCodes } from 'http-status-codes';

export const response = (req: Request, res: Response, next: NextFunction) => {
  res.sendJson = (statusCode: number, body: any = {}) => {
    return res.status(statusCode).json(body);
  };

  res.file = (filePath: string, fileName: string) => {
    const exists = fs.existsSync(filePath);
    if (exists) {
      return res.download(filePath, fileName);
    }
    throw new ExposableError(middlewareErrorLib.FileNotFound);
  };

  res.sendBuffer = (buffer: Buffer, fileName: string) => {
    res.setHeader('Content-Disposition', contentDisposition(fileName));
    const statusCode = StatusCodes.OK;
    return res.status(statusCode).send(buffer);
  };

  res.compressed = (statusCode: number, body: any) => {
    zlib.deflate(body, { level: 9, memLevel: 9 }, (err, buffer) => {
      // log.info(`${buffer.length} bytes of data sent after compression`);

      if (err) throw new ExposableError(middlewareErrorLib.CompressionError);

      res.writeHead(statusCode, { 'Content-Encoding': 'deflate', 'Content-Type': 'text/javascript' });
      return res.end(buffer);
    });
  };

  next();
};
