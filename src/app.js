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
  const input = req.sanitize(req.body.payload);
  data.push(input);
  return res.status(201).json({
    success: true,
    count: data.length,
    input: input,
  });
});


export default app;