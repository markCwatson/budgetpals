import { describe, expect, it } from '@jest/globals';
import Server from '../src/Server';

describe('server', () => {
  describe('isEnvValid', () => {
    it('should return `true` for valid env values', () => {
      expect(Server.isEnvValid('development')).toEqual(true);
      expect(Server.isEnvValid('production')).toEqual(true);
      expect(Server.isEnvValid('staging')).toEqual(true);
    });

    it('should return `false` for invalid env values', () => {
      expect(Server.isEnvValid('foobar')).toEqual(false);
    });
  });
});
