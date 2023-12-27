import { PermissionType } from '@prisma/client';
import { ok } from 'node:assert';
import { ROOT_COMPANY, ROOT_PASSWORD, ROOT_USERNAME } from './constants';
import { prismaClient } from './prismaClient';
import { generateId, sha256 } from './utils';

export const seedDatabase = async () => {
  let rootCompany = await prismaClient.company.findUnique({
    where: { name: ROOT_COMPANY },
  });
  if (rootCompany === null) {
    ok(ROOT_COMPANY, 'ROOT_COMPANY environment variable is not provided');
    console.info('Creating root company');
    rootCompany = await prismaClient.company.create({
      data: {
        id: generateId(),
        name: ROOT_COMPANY,
      },
    });
  }
  let rootUser = await prismaClient.user.findUnique({
    where: { username: ROOT_USERNAME },
  });
  if (rootUser === null) {
    ok(ROOT_PASSWORD, 'ROOT_PASSWORD environment variable is not provided');
    ok(ROOT_USERNAME, 'ROOT_USERNAME environment variable is not provided');
    console.info('Creating root user');
    rootUser = await prismaClient.user.create({
      data: {
        id: generateId(),
        username: ROOT_USERNAME,
        password: sha256(ROOT_PASSWORD),
      },
    });
  }
  const permission = await prismaClient.permission.findUnique({
    where: {
      company_id_user_id: {
        company_id: rootCompany.id,
        user_id: rootUser.id,
      },
    },
  });
  if (permission === null) {
    console.info('Creating owner permission for root company and root user');
    await prismaClient.permission.create({
      data: {
        id: generateId(),
        company_id: rootCompany.id,
        user_id: rootUser.id,
        type: PermissionType.owner,
      },
    });
  }
};
