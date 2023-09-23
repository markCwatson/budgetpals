import getRouteHandler from './routeHandler';
import { Router } from 'express';

const routeConfig = (api: Router) => {
  api.post(
    '/',
    getRouteHandler(async (req, res, next) => {
      res.status(200).send({ message: 'OK' });
    }),
  );
};

export default routeConfig;
