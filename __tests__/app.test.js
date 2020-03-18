// eslint-disable-next-line no-unused-vars
//import polyfill from 'babel-polyfill';
import supertest from 'supertest';

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

describe('GET endpoints', () => {
  it('should GET root route', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.hello).toBe('world');
    done();
  });
});