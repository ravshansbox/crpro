import { type CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { parseAccessTokenFromRequest } from './utils';

export const createContext = async ({
  req: request,
  res: response,
}: CreateHTTPContextOptions) => {
  try {
    const { accessToken, user } = await parseAccessTokenFromRequest(request);
    return { request, response, accessToken, user };
  } catch (error) {
    return { request, response };
  }
};

export type Context = Awaited<typeof createContext>;
