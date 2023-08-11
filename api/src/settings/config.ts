const env = (key, def = null, values = []) => {
  const exists = Object.prototype.hasOwnProperty.call(process.env, key);
  if (
    exists &&
    (!values.length || values.includes(process.env[key])) &&
    process.env[key] !== ''
  ) {
    return process.env[key];
  }
  return def;
};

export default {
  API_PORT: env('API_PORT', 3000),
  NODE_ENV: env('NODE_ENV', 'development'),
  DATABASE: {
    HOST: env('DATABASE_HOST'),
    USER: env('DATABASE_USER'),
    PASSWORD: env('DATABASE_PASSWORD'),
    NAME: env('DATABASE_NAME'),
  },
};
