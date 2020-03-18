import polyfill from 'babel-polyfill';
import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

describe('API endpoints', () => {
  it('should GET root route', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(0);
    expect(response.body.data).toEqual([]);
    done();
  });
});