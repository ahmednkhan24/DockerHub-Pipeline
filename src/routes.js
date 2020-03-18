import express from 'express';
import { 
  getRoot,
  getData,
  postData,
  putData,
  deleteData,
  getNotFound,
} from './controller';

const router = express.Router();

router.route('/').get(getRoot);
router.route('/data').get(getData).post(postData);
router.route('/data/:id').put(putData).delete(deleteData);
router.route('*').get(getNotFound);

export default router;
