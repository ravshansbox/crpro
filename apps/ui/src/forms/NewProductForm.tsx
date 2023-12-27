import { type FC } from 'react';
import { useGlobalState } from '../GlobalState';
import { trpcReact } from '../trpc';
import { ProductForm } from './ProductForm';

export const NewProductForm: FC = () => {
  const [globalState] = useGlobalState();
  const products = trpcReact.products.findMany.useQuery(
    { company_id: globalState.selectedCompanyId || '' },
    { enabled: globalState.selectedCompanyId !== undefined },
  );
  const createProduct = trpcReact.products.createOne.useMutation({
    onSuccess: () => products.refetch(),
  });

  return (
    <ProductForm
      className="mx-auto mt-8 w-96"
      defaultValues={{ name: '' }}
      onSubmit={(values) => {
        if (globalState.selectedCompanyId !== undefined) {
          createProduct.mutate({
            ...values,
            company_id: globalState.selectedCompanyId,
          });
        }
      }}
    />
  );
};
