import { TRPCError, initTRPC } from '@trpc/server';
import { ok } from 'node:assert';
import { type Context } from './context';

export const { middleware, procedure, router } = initTRPC
  .context<Context>()
  .create();

export const authProcedure = procedure.use(
  middleware(({ ctx, next }) => {
    ok(ctx.user, new TRPCError({ code: 'UNAUTHORIZED' }));
    return next({ ctx });
  }),
);
