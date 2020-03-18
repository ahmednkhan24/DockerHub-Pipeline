import express from 'express';
import sanitizer from 'express-sanitizer';
import bodyParser from 'body-parser';
import dotenvSafe from 'dotenv-safe';

import { isObjectEmpty } from './utils';

dotenvSafe.config({ path: '.env' });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sanitizer());

const data = [];

app.get('/', async (req, res) => {
  return res.status(200).json({ 
    success: true,
    count: data.length,
    data: data,
  });
});

app.post('/', async (req, res) => {
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

app.put('/', async (req, res) => {
  if (isObjectEmpty(req.body) || !req.body.oldPayload || !req.body.newPayload) {
    return res.status(400).json({
      success: false,
      message: 'Provide input',
    });
  }
  const valueToFind = req.sanitize(req.body.oldPayload).toString();
  const changeTo = req.sanitize(req.body.newPayload).toString();
  const index = data.indexOf(valueToFind);
  if (index === -1) {
    return res.status(500).json({
      success: false,
      message: 'Not found',
    });
  }
  data[index] = changeTo;
  return res.status(200).json({
    success: true,
    count: data.length,
    oldValue: valueToFind,
    newValue: data[index],
  });
});


export default app;