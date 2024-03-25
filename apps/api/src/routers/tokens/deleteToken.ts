import { z } from 'zod';
import { prismaClient } from '../../prismaClient';
import { trpc } from '../../trpc';

export const deleteToken = trpc.procedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    return prismaClient.token.delete({
      where: { id: input.id },
    });
  });
