import { NextFunction, Request, Response } from 'express';
import HttpException from '../http.exception';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });

  next();
};

export default errorMiddleware;
