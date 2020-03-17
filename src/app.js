import express from 'express';
import sanitizer from 'express-sanitizer';
import bodyParser from 'body-parser';
import dotenvSafe from 'dotenv-safe';

dotenvSafe.config({ path: '.env' });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sanitizer());

const data = [];

const isObjectEmpty = (obj) => Object.entries(obj).length === 0;

app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true,
    count: data.length,
    data: data,
  });
});

app.post('/', (req, res) => {
  if (isObjectEmpty(req.body) || !req.body.input) {
    res.status(400).json({
      success: false,
      message: 'Provide input',
    });
  }
  const input = req.sanitize(req.body.input);
  data.push(input);
  res.status(201).json({
    success: true,
    count: data.length,
    input: input,
  });
});


export default app;