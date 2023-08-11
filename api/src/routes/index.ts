import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import auth from './auth';

export default (app) => {
  const { validate } = new Validator({});
  const api = express.Router();

  auth(api, validate);

  app.use('/api', api);
};
