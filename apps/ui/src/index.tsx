import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './Auth';
import { GlobalStateContextProvider } from './GlobalState';
import { router } from './router';
import { queryClient, trpcClient, trpcReact } from './trpc';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <GlobalStateContextProvider>
            <RouterProvider router={router} />
          </GlobalStateContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </trpcReact.Provider>
  </StrictMode>,
);
