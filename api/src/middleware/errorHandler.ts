import { ValidationError } from 'express-json-validator-middleware';
import ApiError from '../errors/ApiError';

export default (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send({
      error: {
        code: 400,
        message: 'Bad request',
        explanation: err.validationErrors.body || err.validationErrors.query,
      },
    });
    return;
  }

  if (err instanceof ApiError) {
    res.status(err.code).send({
      error: {
        code: err.code,
        message: err.message,
        explanation: err.explanation,
      },
    });
    return;
  }

  res.status(500).send({
    error: {
      code: 500,
      message: 'Internal server error',
      explanation: err.message,
    },
  });
};
