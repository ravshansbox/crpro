import type { AppRouter } from '@cloudretail/api';
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCClient, createTRPCReact } from '@trpc/react-query';
import { VITE_API_BASE_URL } from './constants';

const link = httpBatchLink({ url: VITE_API_BASE_URL });

export const trpcVanillaClient = createTRPCClient<AppRouter>({ links: [link] });

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({ links: [link] });

export const queryClient = new QueryClient();
