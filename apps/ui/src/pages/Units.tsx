import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';
import { ListTable } from '../components/ListTable';
import { NavLink, UnorderedList } from '../components/core';
import { useShowCompanySelect } from '../hooks/useShowCompanySelect';
import { trpcReact } from '../trpc';

export const Units: FC = () => {
  const [globalState] = useGlobalState();
  const units = trpcReact.units.findMany.useQuery(
    { company_id: globalState.selectedCompanyId || '' },
    { enabled: globalState.selectedCompanyId !== undefined },
  );
  useShowCompanySelect();

  return (
    <>
      <ListTable
        heading="Units"
        actions={
          <UnorderedList>
            <li>
              <NavLink to="new">New</NavLink>
            </li>
          </UnorderedList>
        }
        data={units.data}
        columns={[{ accessorKey: 'name', header: 'Name' }]}
      />
      <Outlet />
    </>
  );
};
