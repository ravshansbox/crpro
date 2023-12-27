import { createBrowserRouter } from 'react-router-dom';
import { NewCompanyForm } from './forms/NewCompanyForm';
import { NewCustomerForm } from './forms/NewCustomerForm';
import { NewInvoiceForm } from './forms/NewInvoiceForm';
import { NewProductForm } from './forms/NewProductForm';
import { NewUnitForm } from './forms/NewUnitForm';
import { NewUserForm } from './forms/NewUserForm';
import { App } from './pages/App';
import { Companies } from './pages/Companies';
import { Customers } from './pages/Customers';
import { Dashboard } from './pages/Dashboard';
import { Invoices } from './pages/Invoices';
import { Products } from './pages/Products';
import { Units } from './pages/Units';
import { Users } from './pages/Users';

export const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      { path: '', Component: Dashboard },
      {
        path: 'users',
        Component: Users,
        children: [{ path: 'new', Component: NewUserForm }],
      },
      {
        path: 'companies',
        Component: Companies,
        children: [{ path: 'new', Component: NewCompanyForm }],
      },
      {
        path: 'customers',
        Component: Customers,
        children: [{ path: 'new', Component: NewCustomerForm }],
      },
      {
        path: 'units',
        Component: Units,
        children: [{ path: 'new', Component: NewUnitForm }],
      },
      {
        path: 'products',
        Component: Products,
        children: [{ path: 'new', Component: NewProductForm }],
      },
      {
        path: 'invoices',
        Component: Invoices,
        children: [{ path: 'new', Component: NewInvoiceForm }],
      },
    ],
  },
]);
