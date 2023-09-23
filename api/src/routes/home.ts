import getRouteHandler from './routeHandler';
import { Router } from 'express';

const routeConfig = (api: Router) => {
  api.get(
    '/',
    getRouteHandler(async (req, res, next) => {
      res.status(200).send({ message: 'OK' });
    }),
  );
};

export default routeConfig;
