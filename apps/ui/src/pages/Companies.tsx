import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ListTable } from '../components/ListTable';
import { NavLink, UnorderedList } from '../components/core';
import { trpcReact } from '../trpc';

export const Companies: FC = () => {
  const companies = trpcReact.companies.findMany.useQuery();

  return (
    <>
      <ListTable
        heading="Companies"
        actions={
          <UnorderedList>
            <li>
              <NavLink to="new">New</NavLink>
            </li>
          </UnorderedList>
        }
        data={companies.data}
        columns={[
          { accessorKey: 'name', header: 'Name' },
          { accessorKey: 'permissions', header: 'Permission' },
        ]}
      />
      <Outlet />
    </>
  );
};
