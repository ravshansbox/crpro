import { z } from 'zod';
import { prismaClient } from '../prismaClient';
import { authProcedure, router } from '../trpc';
import { checkPermission, generateId } from '../utils';

const findMany = authProcedure
  .input(z.object({ company_id: z.string() }))
  .query(async ({ ctx, input }) => {
    await checkPermission(input.company_id, ctx.user.id);
    return prismaClient.unit.findMany({
      where: { company_id: input.company_id },
      orderBy: [{ name: 'asc' }],
    });
  });

const createOne = authProcedure
  .input(z.object({ company_id: z.string(), name: z.string() }))
  .mutation(async ({ ctx, input }) => {
    await checkPermission(input.company_id, ctx.user.id);
    return prismaClient.unit.create({
      data: {
        id: generateId(),
        company_id: input.company_id,
        name: input.name,
      },
    });
  });

export const unitRouter = router({
  findMany,
  createOne,
});
