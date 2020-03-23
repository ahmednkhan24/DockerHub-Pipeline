import express from 'express';
import {
  getRoot,
  getData,
  postData,
  putData,
  deleteData,
  seedData,
  purgeData,
  notFound,
} from './controller';

const router = express.Router();

router.route('/').get(getRoot);

router.route('/data').get(getData).post(postData);
router.route('/data/:payload').put(putData).delete(deleteData);

router.route('/seed').post(seedData).delete(purgeData);
router.route('*').get(notFound).post(notFound).put(notFound)
  .delete(notFound);

export default router;
