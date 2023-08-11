require('../jest.setup');

// integration tests special setup
const request = require('supertest');

const config = require('../src/settings/config').default;
const Server = require('../src/Server').default;

// starts test server
const server = new Server();
server.start();

global.config = config;
global.server = server;
global.request = request(server.getExpressApp());

// eslint-disable-next-line no-undef
beforeEach(() => {});

// eslint-disable-next-line no-undef
beforeAll(async () => {});
