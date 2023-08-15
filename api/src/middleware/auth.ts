import { NextFunction, Request, Response } from 'express';

import middleware from './';
import AuthService from '../services/AuthService';
import UsersService from '../services/UsersService';
import ApiError from '../errors/ApiError';

export default middleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.get('authorization');
    if (!auth) {
      throw new ApiError({
        code: 403,
        message: 'No authorization header',
        explanation: 'You must be logged in to access this resource',
      });
    }

    const [prefix, token] = auth.split(' ');
    if (!prefix || prefix.toLowerCase() !== 'bearer' || !token) {
      throw new ApiError({
        code: 403,
        message: 'Invalid authorization header',
        explanation: 'You must be logged in to access this resource',
      });
    }

    let decoded = null;
    try {
      decoded = AuthService.decodeAndVerifyToken(token);
    } catch (error) {
      throw error;
    }

    const user = await UsersService.selectById(decoded.sub);
    if (!user) {
      throw new ApiError({
        code: 403,
        message: 'Invalid authorization token',
      });
    }

    res.locals['user'] = user;
    next();
  },
);
