import express from 'express';
import { 
  getRoot,
  getData,
  postData,
  putData,
  deleteData,
  notFound,
} from './controller';

const router = express.Router();

router.route('/').get(getRoot);
router.route('/data').get(getData).post(postData);
router.route('/data/:id').put(putData).delete(deleteData);
router.route('*').get(notFound).post(notFound).put(notFound).delete(notFound);

export default router;
