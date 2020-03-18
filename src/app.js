import express from 'express';
import sanitizer from 'express-sanitizer';
import bodyParser from 'body-parser';
import dotenvSafe from 'dotenv-safe';
import controller from './controller';

dotenvSafe.config({ path: '.env' });

const api = express();
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(sanitizer());
api.use(controller);

export default api;
