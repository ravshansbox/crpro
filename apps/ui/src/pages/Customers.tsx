import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';
import { ListTable } from '../components/ListTable';
import { NavLink, UnorderedList } from '../components/core';
import { useShowCompanySelect } from '../hooks/useShowCompanySelect';
import { trpcReact } from '../trpc';

export const Customers: FC = () => {
  const [globalState] = useGlobalState();
  const customers = trpcReact.customers.findMany.useQuery(
    { company_id: globalState.selectedCompanyId || '' },
    { enabled: globalState.selectedCompanyId !== undefined },
  );
  useShowCompanySelect();

  return (
    <>
      <ListTable
        heading="Customers"
        actions={
          <UnorderedList>
            <li>
              <NavLink to="new">New</NavLink>
            </li>
          </UnorderedList>
        }
        data={customers.data}
        columns={[{ accessorKey: 'name', header: 'Name' }]}
      />
      <Outlet />
    </>
  );
};
