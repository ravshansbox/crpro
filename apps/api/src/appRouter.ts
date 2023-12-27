import { accessTokenRouter } from './routers/accessTokenRouter';
import { companyRouter } from './routers/companyRouter';
import { customerRouter } from './routers/customerRouter';
import { invoiceRouter } from './routers/invoiceRouter';
import { productRouter } from './routers/productRouter';
import { unitRouter } from './routers/unitRouter';
import { userRouter } from './routers/userRouter';
import { router } from './trpc';

export const appRouter = router({
  accessTokens: accessTokenRouter,
  companies: companyRouter,
  customers: customerRouter,
  invoices: invoiceRouter,
  products: productRouter,
  units: unitRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;
