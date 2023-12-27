import { format } from 'date-fns';
import { type FC } from 'react';
import { useGlobalState } from '../GlobalState';
import { trpcReact } from '../trpc';
import { InvoiceForm } from './InvoiceForm';

export const NewInvoiceForm: FC = () => {
  const [globalState] = useGlobalState();
  const invoices = trpcReact.invoices.findMany.useQuery(
    { company_id: globalState.selectedCompanyId || '' },
    { enabled: globalState.selectedCompanyId !== undefined },
  );
  const createInvoices = trpcReact.invoices.createOne.useMutation({
    onSuccess: () => invoices.refetch(),
  });

  return (
    <InvoiceForm
      className="mx-auto mt-8 w-96"
      defaultValues={{
        customer_id: '',
        due_date: format(new Date(), 'yyyy-MM-dd'),
      }}
      onSubmit={(values) => {
        if (globalState.selectedCompanyId !== undefined) {
          createInvoices.mutate({
            ...values,
            company_id: globalState.selectedCompanyId,
            customer_id: values.customer_id || '',
          });
        }
      }}
    />
  );
};
