/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import httpStatus from 'http-status';

import { Request, Response } from 'express';
import BusinessError from '@src/shared/errors/business-error';
import UnauthorizedError from '@src/shared/errors/unauthorized-error';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: (err: any) => any) {
    switch (error.constructor) {
      case HttpError:
        response.status(error.httpCode).json(error);
        break;
      case BusinessError:
        response.status(httpStatus.BAD_REQUEST).json(error);
        break;
      case UnauthorizedError:
        response.status(httpStatus.UNAUTHORIZED).json(error);
        break;
      default:
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }

    next(error);
  }
}
