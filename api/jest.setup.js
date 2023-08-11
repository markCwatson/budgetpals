global.db = null;
global.connection = null;

global.mockClearAllInstanceMethods = (klass) => {
  Object.keys(klass.prototype).forEach((method) =>
    klass.prototype[method].mockClear(),
  );
};

global.mockClearAllStaticMethods = (klass) => {
  Object.getOwnPropertyNames(klass).forEach((name) => {
    if (
      typeof klass[name] === 'function' &&
      typeof klass[name].mockClear === 'function'
    ) {
      klass[name].mockClear();
    }
  });
};

// eslint-disable-next-line no-undef
beforeAll(async () => {});

// eslint-disable-next-line no-undef
beforeEach(() => {
  // eslint-disable-next-line no-undef
  global.REQ = {
    body: {},
    app: {
      // eslint-disable-next-line no-undef
      get: jest.fn().mockImplementation((key) => key),
    },
  };

  global.RES = {
    locals: {},
    // eslint-disable-next-line no-undef
    send: jest.fn().mockReturnThis(),
    // eslint-disable-next-line no-undef
    status: jest.fn().mockReturnThis(),
  };
});

// eslint-disable-next-line no-undef
afterEach(() => {
  global.REQ?.app?.get?.mockClear();
  global.RES?.send?.mockClear();
  global.RES?.status?.mockClear();
});

// eslint-disable-next-line no-undef
afterAll(async () => {
  if (global.setup) {
    const api = await global.setup();
    await api.cleanup(true);
  }
});
