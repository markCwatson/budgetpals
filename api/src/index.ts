import Server from './Server';
const { config } = require('./settings');

// Validate environment
if (!Server.isEnvValid(config.NODE_ENV)) {
  throw new Error(`Invalid NODE_ENV value '${config.NODE_ENV}'`);
}

(async () => {
  try {
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
  }
})();
