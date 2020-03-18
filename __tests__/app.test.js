import polyfill from 'babel-polyfill';
import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

describe('API GET endpoints', () => {
  it('should GET root route', async (done) => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(0);
    expect(response.body.data).toEqual([]);
    done();
  });
});

describe('API POST endpoints', () => {
  const body = { payload: 'hello world' };
  
  it('should POST root route - SUCCESS', async (done) => {
    const response = await request.post('/').send(body);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(1);
    expect(response.body.input).toEqual(body.payload);
    done();
  });
});
