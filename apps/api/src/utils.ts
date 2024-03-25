import { TRPCError } from '@trpc/server';
import { ok } from 'node:assert';
import { createHash, randomUUID } from 'node:crypto';
import { type IncomingMessage } from 'node:http';
import { prismaClient } from './prismaClient';

export const id = () => {
  return randomUUID();
};

export const hashPassword = (password: string) => {
  return createHash('sha256').update(password).digest('hex');
};

export async function seedDatabase() {
  await prismaClient.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      id: id(),
      username: 'admin',
      password: hashPassword('admin'),
    },
  });
}

export const parseAccessTokenFromHeader = (authorization: string) => {
  const result = /^Bearer (.+)$/.exec(authorization);
  return result === null ? undefined : result[1];
};

export const parseAccessTokenFromRequest = async (request: IncomingMessage) => {
  const { authorization } = request.headers;
  ok(authorization, new TRPCError({ code: 'UNAUTHORIZED' }));
  const accessTokenId = parseAccessTokenFromHeader(authorization);
  ok(accessTokenId, new TRPCError({ code: 'UNAUTHORIZED' }));
  const accessTokenWithUser = await prismaClient.token.findUnique({
    where: { id: accessTokenId },
    include: { user: true },
  });
  ok(accessTokenWithUser, new TRPCError({ code: 'UNAUTHORIZED' }));
  const { user, ...accessToken } = accessTokenWithUser;
  return { accessToken, user };
};
