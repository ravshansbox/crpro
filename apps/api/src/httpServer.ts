import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './appRouter';
import { createContext } from './context';

export const httpServer = createHTTPServer({
  createContext,
  router: appRouter,
});
