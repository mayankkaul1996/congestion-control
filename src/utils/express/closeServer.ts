import { Server } from 'http';

export const closeServer = (server: Server): void => {
  server.close(() => {
    process.exit(0);
  });
};
