import { z } from 'zod';
import { prismaClient } from '../prismaClient';
import { authProcedure, router } from '../trpc';
import { checkPermission, generateId } from '../utils';

const findMany = authProcedure
  .input(z.object({ company_id: z.string() }))
  .query(async ({ ctx, input }) => {
    await checkPermission(input.company_id, ctx.user.id);
    return prismaClient.invoice.findMany({
      include: { customer: true },
      where: { company_id: input.company_id },
      orderBy: [{ due_date: 'desc' }],
    });
  });

const createOne = authProcedure
  .input(
    z.object({
      company_id: z.string(),
      customer_id: z.string(),
      due_date: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await checkPermission(input.company_id, ctx.user.id);
    return prismaClient.invoice.create({
      data: {
        id: generateId(),
        company_id: input.company_id,
        customer_id: input.customer_id,
        due_date: new Date(input.due_date),
      },
    });
  });

export const invoiceRouter = router({
  findMany,
  createOne,
});
