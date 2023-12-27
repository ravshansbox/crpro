import { TRPCError } from '@trpc/server';
import { ok } from 'node:assert';
import { createHash, randomBytes } from 'node:crypto';
import { type IncomingMessage } from 'node:http';
import { prismaClient } from './prismaClient';

export const generateId = () => {
  return randomBytes(16).toString('hex');
};

export const objectKeys = <
  Value extends Record<string, unknown>,
  Key = keyof Value,
>(
  value: Value,
) => {
  return Object.keys(value) as unknown as Key[];
};

export const omitProps = <
  Value extends Record<string, unknown>,
  Key extends keyof Value,
>(
  value: Value,
  keys: Key[],
) => {
  return objectKeys(value).reduce(
    (agg, key) => {
      if (!keys.includes(key as Key)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (agg as any)[key] = value[key];
      }
      return agg;
    },
    {} as Omit<Value, Key>,
  );
};

export const sha256 = (value: string) => {
  return createHash('sha256').update(value).digest('hex');
};

export const checkPermission = async (companyId: string, userId: string) => {
  const permission = await prismaClient.permission.findUnique({
    where: { company_id_user_id: { company_id: companyId, user_id: userId } },
  });
  ok(permission, new TRPCError({ code: 'FORBIDDEN' }));
};

export const parseToken = (authorization: string) => {
  const result = /^Bearer (.+)$/.exec(authorization);
  return result === null ? undefined : result[1];
};

export const parseAccessTokenFromRequest = async (request: IncomingMessage) => {
  const { authorization } = request.headers;
  if (authorization === undefined) {
    throw new Error('No authorization header');
  }

  const accessTokenId = parseToken(authorization);
  if (accessTokenId === undefined) {
    throw new Error('No access token');
  }

  const accessTokenWithUser = await prismaClient.accessToken.findUnique({
    where: { id: accessTokenId },
    include: { user: true },
  });
  if (accessTokenWithUser === null) {
    throw new Error('Invalid access token');
  }

  const { user, ...accessToken } = accessTokenWithUser;

  return { accessToken, user };
};
