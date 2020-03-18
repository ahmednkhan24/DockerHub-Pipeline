import express from 'express';
import sanitizer from 'express-sanitizer';
import bodyParser from 'body-parser';
import dotenvSafe from 'dotenv-safe';

import { isObjectEmpty } from './utils';

dotenvSafe.config({ path: '.env' });

const api = express();
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(sanitizer());

const data = [];

api.get('/data', async (req, res) => {
  return res.status(200).json({ 
    success: true,
    count: data.length,
    data: data,
  });
});

api.post('/data', async (req, res) => {
  if (isObjectEmpty(req.body) || !req.body.payload) {
    return res.status(400).json({
      success: false,
      message: 'Provide input',
    });
  }
  const input = req.sanitize(req.body.payload).toString();
  data.push(input);
  return res.status(201).json({
    success: true,
    count: data.length,
    input: input,
  });
});

api.put('/data', async (req, res) => {
  if (isObjectEmpty(req.body) || !req.body.oldPayload || !req.body.newPayload) {
    return res.status(400).json({
      success: false,
      message: 'Provide input',
    });
  }
  const oldInput = req.sanitize(req.body.oldPayload).toString();
  const newInput = req.sanitize(req.body.newPayload).toString();
  const index = data.indexOf(oldInput);
  if (index === -1) {
    return res.status(500).json({
      success: false,
      message: 'Not found',
    });
  }
  data[index] = newInput;
  return res.status(200).json({
    success: true,
    count: data.length,
    oldValue: oldInput,
    newValue: data[index],
  });
});

api.delete('/data', async (req, res) => {
  return res.status(200).json({delete: 'success'});
});

export default api;
