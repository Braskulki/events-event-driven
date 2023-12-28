import { AuthSession } from '@src/shared/auth.interface';
import UnauthorizedError from '@src/shared/errors/unauthorized-error';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function authenticate(req: Request, res: Response, next: NextFunction): void {
  if (!req.headers?.authorization) {
    throw new UnauthorizedError('Missing headers');
  }

  let token: string | null = null;
  const parts: string[] = req.headers.authorization.split(' ');

  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
    [, token] = parts;
  }

  if (!token) {
    throw new UnauthorizedError('Missing token');
  }

  const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.JWT_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
  const decoded: AuthSession = jwt.verify(token, publicKey) as AuthSession;

  req.session = {
    idUser: decoded.idUser
  };

  return next();
}

export default authenticate;
