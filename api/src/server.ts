import express from 'express';
import cors from 'cors';

import errorHandler from './middleware/errorHandler';
import setRoutes from './routes';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  start() {
    this.app.use(express.json());
    this.app.use(cors());

    setRoutes(this.app);

    this.app.use(errorHandler);
    this.set404handler();

    return this.app;
  }

  getExpressApp() {
    return this.app;
  }

  static isEnvValid(env: string): boolean {
    return ['development', 'production', 'staging'].includes(env);
  }

  private set404handler() {
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
}

export default Server;
