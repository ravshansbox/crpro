import { type AppRouter } from '@cloudretail/api/src/appRouter';
import { QueryClient } from '@tanstack/react-query';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { ACCESS_TOKEN_ID_KEY, VITE_API_BASE_URL as url } from './constants';

const headers = () => {
  const accessTokenId = window.localStorage.getItem(ACCESS_TOKEN_ID_KEY);
  return accessTokenId === null
    ? {}
    : { Authorization: `Bearer ${accessTokenId}` };
};

export const queryClient = new QueryClient();

export const trpcProxyClient = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url, headers })],
});

export const trpcReact = createTRPCReact<AppRouter>();

export const trpcClient = trpcReact.createClient({
  links: [httpBatchLink({ url, headers })],
});
