import { format } from 'date-fns';
import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';
import { ListTable } from '../components/ListTable';
import { NavLink, UnorderedList } from '../components/core';
import { useShowCompanySelect } from '../hooks/useShowCompanySelect';
import { trpcReact } from '../trpc';

export const Invoices: FC = () => {
  const [globalState] = useGlobalState();
  const invoices = trpcReact.invoices.findMany.useQuery(
    { company_id: globalState.selectedCompanyId || '' },
    { enabled: globalState.selectedCompanyId !== undefined },
  );
  useShowCompanySelect();

  return (
    <>
      <ListTable
        heading="Invoices"
        actions={
          <UnorderedList>
            <li>
              <NavLink to="new">New</NavLink>
            </li>
          </UnorderedList>
        }
        columns={[
          { accessorKey: 'due_date', header: 'Due Date' },
          { accessorKey: 'customer.name', header: 'Customer' },
        ]}
        data={invoices.data?.map((invoice) => ({
          ...invoice,
          due_date: format(new Date(invoice.due_date), 'yyyy-MM-dd'),
        }))}
      />
      <Outlet />
    </>
  );
};
