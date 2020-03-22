import express from 'express';
import sanitizer from 'express-sanitizer';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import swaggerDoc from '../swagger.json';

dotenv.config({ path: '.env' });

const api = express();
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(sanitizer());
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
api.use(routes);

export default api;
