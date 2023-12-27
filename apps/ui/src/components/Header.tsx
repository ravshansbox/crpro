import { type FC } from 'react';
import { useAuth } from '../Auth';
import { ACCESS_TOKEN_ID_KEY } from '../constants';
import { GlobalCompanySelect } from './GlobalCompanySelect';
import { Button, NavLink, UnorderedList } from './core';

const links = [
  { title: 'Users', url: 'users' },
  { title: 'Companies', url: 'companies' },
  { title: 'Customers', url: 'customers' },
  { title: 'Units', url: 'units' },
  { title: 'Products', url: 'products' },
  { title: 'Invoices', url: 'invoices' },
];

export const Header: FC = () => {
  const [auth, setAuth] = useAuth();

  return (
    <header className="flex items-center justify-between gap-2">
      <UnorderedList>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink to={link.url}>{link.title}</NavLink>
          </li>
        ))}
      </UnorderedList>
      <div className="flex items-center gap-2">
        <GlobalCompanySelect />
        <NavLink to="/">{auth.username}</NavLink>
        <Button
          variant="link"
          onClick={() => {
            localStorage.removeItem(ACCESS_TOKEN_ID_KEY);
            setAuth((value) => ({ ...value, isAuthenticated: false }));
          }}
        >
          logout
        </Button>
      </div>
    </header>
  );
};
