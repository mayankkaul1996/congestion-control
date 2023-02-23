import { config } from '../../config';

export const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const port: number | string = config.get('port');
  const bind: string = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  console.error('Error code', error.code);

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`, error);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`, error);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
