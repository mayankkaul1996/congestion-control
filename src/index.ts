import * as http from 'http';
import { app } from './app';
import { config } from './config';
import { onError } from './utils/express';

export const webAppServer: http.Server = http.createServer(app);

webAppServer.on('error', onError);
webAppServer.listen(config.get('port'), (): void => {
  console.log(`Connected successfully on port ${config.get('port')}`);
});
