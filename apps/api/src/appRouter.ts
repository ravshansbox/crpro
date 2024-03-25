import companies from './routers/companies';
import tokens from './routers/tokens';
import { trpc } from './trpc';

export const appRouter = trpc.router({
  companies,
  tokens,
});

export type AppRouter = typeof appRouter;
