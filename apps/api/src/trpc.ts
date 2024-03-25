import { TRPCError, initTRPC } from '@trpc/server';
import { type CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { ok } from 'node:assert';
import { parseAccessTokenFromRequest } from './utils';

export const createContext = async ({
  req: request,
  res: response,
}: CreateHTTPContextOptions) => {
  try {
    const { accessToken, user } = await parseAccessTokenFromRequest(request);
    return { request, response, accessToken, user };
  } catch (error) {
    return { request, response };
  }
};

export type Context = Awaited<typeof createContext>;

export const trpc = initTRPC.context<Context>().create();

export const authProcedure = trpc.procedure.use(
  trpc.middleware(({ ctx, next }) => {
    ok(ctx.user, new TRPCError({ code: 'UNAUTHORIZED' }));
    return next({ ctx });
  }),
);
