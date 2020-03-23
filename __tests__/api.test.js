
// eslint-disable-next-line no-unused-vars
import polyfill from 'babel-polyfill';
import supertest from 'supertest';
import api from '../src/api';
import { getSampleData } from '../src/utils';

const request = supertest(api);

const validRequestBody = { payload: 'helloworld' };
const updatedValidRequestBody = { payload: 'helloworldagain' };
const invalidRequestBody = { input: 'goodbyeworld' };
const inputErrorMessage = 'Provide Input';
const notFoundErrorMessage = 'Not Found';

describe('API GET endpoints', () => {
  it('should GET root route', async (done) => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should GET data route', async (done) => {
    const response = await request.get('/data');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(0);
    expect(response.body.data).toEqual([]);
    done();
  });
});

describe('API POST endpoints', () => {
  it('should POST data route - SUCCESS', async (done) => {
    const response = await request.post('/data').send(validRequestBody);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(1);
    expect(response.body.input).toEqual(validRequestBody.payload);

    await request.delete('/seed');
    done();
  });

  it('should POST data route - FAIL: empty request body', async (done) => {
    const response = await request.post('/data').send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual(inputErrorMessage);
    done();
  });

  it('should POST data route - FAIL: invalid attribute in request body', async (done) => {
    const response = await request.post('/data').send(invalidRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual(inputErrorMessage);
    done();
  });
});

describe('API PUT endpoints', () => {
  it('should PUT data route - SUCCESS', async (done) => {
    await request.post('/data').send(validRequestBody);

    const response = await request.put(`/data/${validRequestBody.payload}`).send(updatedValidRequestBody);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(1);
    expect(response.body.oldValue).toEqual(validRequestBody.payload);
    expect(response.body.newValue).toEqual(updatedValidRequestBody.payload);

    await request.delete('/seed');
    done();
  });

  it('should PUT data route - FAIL: empty request body', async (done) => {
    const response = await request.put('/data/ANY').send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual(inputErrorMessage);
    done();
  });

  it('should PUT data route - FAIL: invalid attribute in request body', async (done) => {
    const response = await request.put(`/data/${invalidRequestBody.input}`).send(invalidRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual(inputErrorMessage);
    done();
  });

  it('should PUT data route - FAIL: valid attribute in request body, but doesn\'t exist', async (done) => {
    const response = await request.put(`/data/${validRequestBody.payload}`).send(validRequestBody);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual(notFoundErrorMessage);
    done();
  });
});

describe('API DELETE endpoints', () => {
  it('should DELETE data: SUCCESS', async (done) => {
    await request.post('/data').send(validRequestBody);

    const response = await request.delete(`/data/${validRequestBody.payload}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(0);
    expect(response.body.data).toEqual([]);
    done();
  });

  it('should DELETE data: FAIL: value not found', async (done) => {
    const response = await request.delete(`/data/${validRequestBody.payload}`);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual(notFoundErrorMessage);
    done();
  });
});

describe('API seed/purge endpoints', () => {
  const sampleData = getSampleData().map((d) => d.toString());

  it('should POST seed data', async (done) => {
    const response = await request.post('/seed');

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(sampleData.length);
    expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(sampleData));
    done();
  });

  it('should DELETE purge data', async (done) => {
    const response = await request.delete('/seed');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(0);
    expect(response.body.data).toEqual([]);
    done();
  });
});

describe('API 404 Endpoint', () => {
  it('should 404 for any unknown path after /*', async (done) => {
    const response = await request.get('/hello');
    expect(response.status).toBe(404);
    done();
  });
});
