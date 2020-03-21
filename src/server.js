import api from './api';

const startServer = () => {
  const PORT = process.env.PORT || 3000;
  const IP = process.env.IP || '127.0.0.1';

  const server = api.listen(PORT, () => {
    console.log('API Server has Started');
    console.log(`running at http://${IP}:${PORT}`);
  });
};

startServer();
