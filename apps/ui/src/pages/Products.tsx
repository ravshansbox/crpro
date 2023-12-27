import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';
import { ListTable } from '../components/ListTable';
import { NavLink, UnorderedList } from '../components/core';
import { useShowCompanySelect } from '../hooks/useShowCompanySelect';
import { trpcReact } from '../trpc';

export const Products: FC = () => {
  const [globalState] = useGlobalState();
  const products = trpcReact.products.findMany.useQuery(
    { company_id: globalState.selectedCompanyId || '' },
    { enabled: globalState.selectedCompanyId !== undefined },
  );
  useShowCompanySelect();

  return (
    <>
      <ListTable
        heading="Products"
        actions={
          <UnorderedList>
            <li>
              <NavLink to="new">New</NavLink>
            </li>
          </UnorderedList>
        }
        data={products.data}
        columns={[{ accessorKey: 'name', header: 'Name' }]}
      />
      <Outlet />
    </>
  );
};
