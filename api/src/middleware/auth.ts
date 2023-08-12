import { NextFunction, Request, Response } from 'express';

import middleware from './';
import AuthService from '../services/AuthService';
import UsersService from '../services/UsersService';

export default middleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.get('authorization');
    if (!auth) {
      res.status(403).send({ error: 'No authorization header' });
      return;
    }

    const [prefix, token] = auth.split(' ');
    if (!prefix || prefix.toLowerCase() !== 'bearer' || !token) {
      res.status(403).send({ error: 'Invalid authorization header' });
      return;
    }

    let decoded = null;
    try {
      decoded = AuthService.decodeAndVerifyToken(token);
    } catch (error) {
      res.status(403).send({ error: error.message });
      return;
    }

    const user = await UsersService.selectById(decoded.sub);
    if (!user) {
      res.status(403).send({ error: 'Invalid authorization token' });
      return;
    }

    res.locals['user'] = user;
    next();
  },
);
