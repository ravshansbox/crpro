import { Role } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { ok } from 'node:assert';
import { z } from 'zod';
import { prismaClient } from '../../prismaClient';
import { authProcedure } from '../../trpc';

export const updateOne = authProcedure
  .input(z.object({ company_id: z.string(), name: z.string() }))
  .mutation(async ({ input }) => {
    const permission = await prismaClient.permission.findFirst({
      where: { role: Role.OWNER, company_id: input.company_id },
    });
    ok(permission, new TRPCError({ code: 'FORBIDDEN' }));
    return prismaClient.company.update({
      data: { name: input.name },
      where: { id: input.company_id },
    });
  });
