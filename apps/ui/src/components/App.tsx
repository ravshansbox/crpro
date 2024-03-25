import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../AuthContext';
import { Dashboard } from './Dashboard';
import { LoginForm } from './LoginForm';

const router = createBrowserRouter([
  { path: '', Component: Dashboard },
  { path: 'login', Component: LoginForm },
]);

export const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};
