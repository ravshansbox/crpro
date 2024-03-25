import { Role } from '@prisma/client';
import { z } from 'zod';
import { prismaClient } from '../../prismaClient';
import { authProcedure } from '../../trpc';
import { id } from '../../utils';

export const createOne = authProcedure
  .input(z.object({ name: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const company = await prismaClient.company.create({
      data: {
        id: id(),
        name: input.name,
      },
    });
    await prismaClient.permission.create({
      data: {
        id: id(),
        company_id: company.id,
        user_id: ctx.user.id,
        role: Role.OWNER,
      },
    });
    return company;
  });
