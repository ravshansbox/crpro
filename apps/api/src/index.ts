import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { createServer } from 'http';
import { HTTP_PORT } from './constants';
import { appRouter } from './trpc';
import { seedDatabase } from './utils';

const requestHandler = createHTTPHandler({ router: appRouter });

const server = createServer();

server.on('request', requestHandler);

server.on('listening', () => {
  console.info('Listening on', server.address());
});

seedDatabase().then(() => {
  server.listen(HTTP_PORT);
});
