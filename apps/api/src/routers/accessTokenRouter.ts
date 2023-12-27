import { TRPCError } from '@trpc/server';
import { equal, ok } from 'node:assert';
import { z } from 'zod';
import { prismaClient } from '../prismaClient';
import { procedure, router } from '../trpc';
import { generateId, omitProps, sha256 } from '../utils';

const findOne = procedure
  .input(z.object({ accessTokenId: z.string() }))
  .query(async ({ input }) => {
    const accessTokenWithUser = await prismaClient.accessToken.findUnique({
      where: { id: input.accessTokenId },
      include: { user: true },
    });
    ok(accessTokenWithUser, new TRPCError({ code: 'UNAUTHORIZED' }));
    const { user, ...accessToken } = accessTokenWithUser;
    return { ...accessToken, user: omitProps(user, ['password']) };
  });

const createOne = procedure
  .input(z.object({ username: z.string(), password: z.string() }))
  .mutation(async ({ input }) => {
    const user = await prismaClient.user.findUnique({
      where: { username: input.username },
    });
    ok(user, new TRPCError({ code: 'UNAUTHORIZED' }));
    equal(
      user.password,
      sha256(input.password),
      new TRPCError({ code: 'UNAUTHORIZED' }),
    );
    const accessToken = await prismaClient.accessToken.create({
      data: { id: generateId(), user_id: user.id },
    });
    return { ...accessToken, user: omitProps(user, ['password']) };
  });

export const accessTokenRouter = router({
  findOne,
  createOne,
});
