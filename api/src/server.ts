import express from 'express';
import cors from 'cors';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  start() {
    this.app.use(express.json());
    this.app.use(cors());

    return this.app;
  }

  static isEnvValid(env: string): boolean {
    return ['development', 'production', 'staging'].includes(env);
  }
}

export = Server;
