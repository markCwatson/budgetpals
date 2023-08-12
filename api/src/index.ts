import Server from './Server';
import { config } from './settings';

import Database from './repositories/Database';

if (!Server.isEnvValid(config.NODE_ENV)) {
  throw new Error(`Invalid NODE_ENV value '${config.NODE_ENV}'`);
}

(async () => {
  let mongo = null;

  const cleanup = () => {
    console.log('Closing database connection...');
    if (mongo && mongo.client) {
      mongo.client.close();
    }
  };

  try {
    mongo = await Database.getInstance();

    const server = new Server();
    server.start().listen(config.API_PORT, () => {
      console.log(
        `Server started in '${config.NODE_ENV}' mode and now listening port ${config.API_PORT}`,
      );
    });
  } catch (err) {
    if (config.NODE_ENV !== 'test') {
      console.error(err);
    }
    cleanup();
  }
})();
