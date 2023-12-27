import { z } from 'zod';
import { prismaClient } from '../prismaClient';
import { authProcedure, router } from '../trpc';
import { checkPermission, generateId } from '../utils';

const findMany = authProcedure
  .input(z.object({ company_id: z.string() }))
  .query(async ({ ctx, input }) => {
    await checkPermission(input.company_id, ctx.user.id);
    return prismaClient.invoiceDetail.findMany({
      where: { company_id: input.company_id },
      orderBy: [{ created_at: 'asc' }],
    });
  });

const createOne = authProcedure
  .input(
    z.object({
      company_id: z.string(),
      invoice_id: z.string(),
      product_id: z.string(),
      datamatrix: z.string(),
      is_container: z.boolean().default(false),
      container_id: z.string(),
      is_closed: z.boolean(),
      item_count: z.number().int().positive(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await checkPermission(input.company_id, ctx.user.id);
    return prismaClient.invoiceDetail.create({
      data: {
        id: generateId(),
        created_at: new Date(),
        company_id: input.company_id,
        invoice_id: input.invoice_id,
        product_id: input.product_id,
        datamatrix: input.datamatrix,
        is_container: input.is_container,
        container_id: input.container_id,
        is_closed: input.is_closed,
        item_count: input.item_count,
      },
    });
  });

export const invoiceDetailRouter = router({
  findMany,
  createOne,
});
