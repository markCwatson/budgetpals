import express from 'express';
import cors from 'cors';
import { ValidationError } from 'express-json-validator-middleware';

const setRoutes = require('./routes');

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  start() {
    this.app.use(express.json());
    this.app.use(cors());

    setRoutes(this.app);

    this.setValidatonErrorHandler();
    this.set404handler();

    return this.app;
  }

  set404handler() {
    this.app.use((req, res) => {
      res.status(404).send({
        error: {
          code: 404,
          message: 'API endpoint is not found',
          url: req.originalUrl,
        },
      });
    });
  }

  setValidatonErrorHandler() {
    this.app.use((err, req, res, next) => {
      if (err instanceof ValidationError) {
        res.status(400).send({
          error: {
            code: 400,
            message: 'Bad request',
            explanation:
              err.validationErrors.body || err.validationErrors.query,
          },
        });
        return;
      }

      console.error(err);
      res.status(500).send({
        error: {
          code: 500,
          message: 'Internal Server Error',
        },
      });
    });
  }

  static isEnvValid(env: string): boolean {
    return ['development', 'production', 'staging'].includes(env);
  }
}

export = Server;
