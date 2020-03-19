import { getSampleData, getErrorMessage, isObjectEmpty } from '../src/utils';

describe('getSampleData', () => {
  it('should return a non-empty array', () => {
    const sampleData = getSampleData();
    expect(sampleData.length > 0).toBe(true);
    expect(sampleData.constructor === Array).toBe(true);
  });
});

describe('isOjectEmpty', () => {
  it('should return true if given an empty object', () => {
    expect(isObjectEmpty({})).toBe(true);
  });

  it('should return false if given a non-empty object', () => {
    expect(isObjectEmpty({ hello: 'world' })).toBe(false);
  });
});

describe('getErrorMessage', () => {
  it('should return \'Provide Input\' when given error code 400', () => {
    expect(getErrorMessage(400)).toBe('Provide Input');
  });

  it('should return \'Not Found\' when given error code 404', () => {
    expect(getErrorMessage(404)).toBe('Not Found');
  });

  it('should return \'Not Found\' when given error code 500', () => {
    expect(getErrorMessage(500)).toBe('Not Found');
  });
});
