import { NextFunction, Request, Response } from 'express';

import middleware from './';
import AuthService from '../services/AuthService';
import UsersService from '../services/UsersService';

export default middleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.get('authorization');
    if (!auth) {
      throw new Error('No authorization header');
    }

    const [prefix, token] = auth.split(' ');
    if (!prefix || prefix.toLowerCase() !== 'bearer' || !token) {
      throw new Error('Invalid authorization header');
    }

    const decoded = AuthService.decodeAndVerifyToken(token);
    const user = await UsersService.selectById(decoded.payload.sub);
    if (!user) {
      throw new Error('Invalid authorization token');
    }

    res.locals['user'] = user;
    next();
  },
);
