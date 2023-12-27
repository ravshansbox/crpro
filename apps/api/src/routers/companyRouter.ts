import { PermissionType } from '.prisma/client';
import { z } from 'zod';
import { prismaClient } from '../prismaClient';
import { authProcedure, router } from '../trpc';
import { generateId } from '../utils';

const findMany = authProcedure.query(async ({ ctx }) => {
  const companies = await prismaClient.company.findMany({
    where: { permissions: { some: { user_id: ctx.user.id } } },
    include: { permissions: { select: { type: true } } },
    orderBy: [{ name: 'asc' }],
  });
  return companies.map(({ permissions, ...company }) => ({
    ...company,
    permissions: permissions.map((permission) => permission.type),
  }));
});

const createOne = authProcedure
  .input(z.object({ name: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return prismaClient.$transaction(async (prismaClient) => {
      const company = await prismaClient.company.create({
        data: {
          id: generateId(),
          name: input.name,
        },
      });
      await prismaClient.permission.create({
        data: {
          id: generateId(),
          company_id: company.id,
          user_id: ctx.user.id,
          type: PermissionType.owner,
        },
      });
      return company;
    });
  });

export const companyRouter = router({
  findMany,
  createOne,
});
