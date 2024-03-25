import { TRPCError } from '@trpc/server';
import { addHours } from 'date-fns';
import { z } from 'zod';
import { prismaClient } from '../../prismaClient';
import { trpc } from '../../trpc';
import { hashPassword, id } from '../../utils';

export const createToken = trpc.procedure
  .input(z.object({ username: z.string(), password: z.string() }))
  .mutation(async ({ input }) => {
    const user = await prismaClient.user.findUniqueOrThrow({
      where: { username: input.username },
    });
    const hashedPassword = hashPassword(input.password);
    if (hashedPassword !== user.password) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    const {
      user: { password: _password, ...userWithoutPassword },
      ...token
    } = await prismaClient.token.create({
      data: {
        id: id(),
        access_token: id(),
        access_token_valid_until: addHours(new Date(), 1),
        refresh_token: id(),
        refresh_token_valid_until: addHours(new Date(), 24),
        user_id: user.id,
      },
      include: {
        user: true,
      },
    });
    return { ...token, user: userWithoutPassword };
  });
