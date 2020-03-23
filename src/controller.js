import { getErrorMessage, getSampleData, isObjectEmpty } from './utils';

const data = [];

/*
 * @desc    Get a 200 code with a success message to test API's status
 * @route   GET /
 * @access  Public
*/
export const getRoot = async (req, res) => res.status(200).json({ success: true });

/*
 * @desc    get all data
 * @route   GET /data
 * @access  Public
*/
export const getData = async (req, res) => res.status(200).json({
  success: true,
  count: data.length,
  data,
});

/*
 * @desc    add data
 * @route   POST /data
 * @access  Public
*/
export const postData = async (req, res) => {
  if (isObjectEmpty(req.body) || !req.body.payload) {
    return res.status(400).json({ success: false, message: getErrorMessage(400) });
  }
  const input = req.sanitize(req.body.payload).toString();
  data.push(input);
  return res.status(201).json({
    success: true,
    count: data.length,
    input,
  });
};

/*
 * @desc    update data
 * @route   PUT /data/:id
 * @access  Public
*/
export const putData = async (req, res) => {
  if (isObjectEmpty(req.body) || !req.body.payload) {
    return res.status(400).json({ success: false, message: getErrorMessage(400) });
  }
  const oldInput = req.sanitize(req.params.payload).toString();
  const newInput = req.sanitize(req.body.payload).toString();
  const index = data.indexOf(oldInput);
  if (index === -1) {
    return res.status(500).json({ success: false, message: getErrorMessage(500) });
  }
  data[index] = newInput;
  return res.status(200).json({
    success: true,
    count: data.length,
    oldValue: oldInput,
    newValue: data[index],
  });
};

/*
 * @desc    delete data
 * @route   DELETE /data/:id
 * @access  Public
*/
export const deleteData = async (req, res) => {
  const payload = req.sanitize(req.params.payload).toString();
  const index = data.indexOf(payload);
  if (index === -1) {
    return res.status(500).json({ success: false, message: getErrorMessage(500) });
  }
  data.splice(index, 1);
  return res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
};

/*
 * @desc    add sample data
 * @route   POST /seed
 * @access  Public
*/
export const seedData = async (req, res) => {
  getSampleData().forEach((d) => data.push(d.toString()));
  return res.status(201).json({
    success: true,
    count: data.length,
    data,
  });
};

/*
 * @desc    delete sample data and free memory
 * @route   DELETE /seed
 * @access  Public
*/
export const purgeData = async (req, res) => {
  data.splice(0, data.length);
  return res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
};

/*
 * @desc    404 Not Found
 * @route   GET /*
 * @access  Public
*/
export const notFound = async (req, res) => res.status(404).json({ 404: getErrorMessage(404) });
