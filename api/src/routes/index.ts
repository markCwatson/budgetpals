const express = require('express');
const { Validator } = require('express-json-validator-middleware');

const auth = require('./auth');

module.exports = (app) => {
  const { validate } = new Validator();
  const api = express.Router();

  auth(api, validate);

  app.use('/api', api);
};
