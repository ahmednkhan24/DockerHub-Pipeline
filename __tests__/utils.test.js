import { isObjectEmpty } from '../src/utils';

describe('isOjectEmpty', () => {
  it('should return true if given an empty object', () => {
    expect(isObjectEmpty({})).toBe(true);
  });

  it('should return false if given a non-empty object', () => {
    expect(isObjectEmpty({ hello: 'world' })).toBe(false);
  });
});