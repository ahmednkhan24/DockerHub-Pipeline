const sampleData = [
  'helloworld',
  5,
  9,
  'goodbyeworld',
];

export const getSampleData = () => sampleData;

export const isObjectEmpty = (obj) => Object.entries(obj).length === 0;
