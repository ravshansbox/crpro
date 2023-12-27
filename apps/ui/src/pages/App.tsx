import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const App: FC = () => (
  <div className="flex flex-col gap-2 p-1">
    <Header />
    <Outlet />
  </div>
);
