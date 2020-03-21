import express from 'express';
import sanitizer from 'express-sanitizer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config({ path: '.env' });

const api = express();
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(sanitizer());
api.use(routes);

export default api;
