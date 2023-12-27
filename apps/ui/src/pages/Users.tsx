import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ListTable } from '../components/ListTable';
import { NavLink, UnorderedList } from '../components/core';
import { trpcReact } from '../trpc';

export const Users: FC = () => {
  const users = trpcReact.users.findMany.useQuery();

  return (
    <>
      <ListTable
        heading="Users"
        actions={
          <UnorderedList>
            <li>
              <NavLink to="new">New</NavLink>
            </li>
          </UnorderedList>
        }
        data={users.data}
        columns={[{ accessorKey: 'username', header: 'Username' }]}
      />
      <Outlet />
    </>
  );
};
