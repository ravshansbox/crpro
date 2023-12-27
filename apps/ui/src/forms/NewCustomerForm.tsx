import { type FC } from 'react';
import { useGlobalState } from '../GlobalState';
import { trpcReact } from '../trpc';
import { CustomerForm } from './CustomerForm';

export const NewCustomerForm: FC = () => {
  const [globalState] = useGlobalState();
  const customers = trpcReact.customers.findMany.useQuery(
    { company_id: globalState.selectedCompanyId || '' },
    { enabled: globalState.selectedCompanyId !== undefined },
  );
  const createCustomer = trpcReact.customers.createOne.useMutation({
    onSuccess: () => customers.refetch(),
  });

  return (
    <CustomerForm
      className="mx-auto mt-8 w-96"
      defaultValues={{ name: '' }}
      onSubmit={(values) => {
        if (globalState.selectedCompanyId !== undefined) {
          createCustomer.mutate({
            ...values,
            company_id: globalState.selectedCompanyId,
          });
        }
      }}
    />
  );
};
