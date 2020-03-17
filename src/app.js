import express from 'express';
import dotenvSafe from 'dotenv-safe';

dotenvSafe.config({ path: '.env' });

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ hello: 'world' });
});

export default app;