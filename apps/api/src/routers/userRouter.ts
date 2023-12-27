import { z } from 'zod';
import { prismaClient } from '../prismaClient';
import { authProcedure, router } from '../trpc';
import { generateId, omitProps, sha256 } from '../utils';

const findMany = authProcedure.query(async () => {
  const users = await prismaClient.user.findMany({
    orderBy: [{ username: 'asc' }],
  });
  return users.map((user) => omitProps(user, ['password']));
});

const createOne = authProcedure
  .input(z.object({ username: z.string(), password: z.string() }))
  .mutation(async ({ input }) => {
    const user = await prismaClient.user.create({
      data: {
        id: generateId(),
        username: input.username,
        password: sha256(input.password),
      },
    });
    return omitProps(user, ['password']);
  });

export const userRouter = router({
  findMany,
  createOne,
});
