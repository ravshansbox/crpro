import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { createServer } from 'node:http';
import { appRouter } from './appRouter';
import { HTTP_PORT } from './constants';
import { createContext } from './trpc';
import { seedDatabase } from './utils';

const requestHandler = createHTTPHandler({ createContext, router: appRouter });

const server = createServer();

server.on('request', requestHandler);

server.on('listening', () => {
  console.info('Listening on', server.address());
});

seedDatabase().then(() => {
  server.listen(HTTP_PORT);
});
