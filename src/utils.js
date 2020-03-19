const sampleData = [
  'helloworld',
  5,
  9,
  'goodbyeworld',
];

const inputError = 'Provide Input';
const notFoundError = 'Not Found';

export const getErrorMessage = (errCode) => errCode === 400 ? inputError : notFoundError; 

export const getSampleData = () => sampleData;

export const isObjectEmpty = (obj) => Object.entries(obj).length === 0;
