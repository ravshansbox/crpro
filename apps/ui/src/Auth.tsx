import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { Heading } from './components/Heading';
import { Login } from './components/Login';
import { ACCESS_TOKEN_ID_KEY } from './constants';
import { trpcProxyClient } from './trpc';
import { type ValueAndAction } from './types';

type AuthContextValue = {
  isTokenValidated: boolean;
  isAuthenticated: boolean;
  username: string | null;
};

const initialValue: AuthContextValue = {
  isTokenValidated: false,
  isAuthenticated: false,
  username: null,
};

const AuthContext = createContext<ValueAndAction<AuthContextValue>>([
  initialValue,
  () => {},
]);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<AuthContextValue>(initialValue);

  useEffect(() => {
    (async () => {
      const accessTokenId = window.localStorage.getItem(ACCESS_TOKEN_ID_KEY);
      if (accessTokenId !== null) {
        try {
          const accessToken = await trpcProxyClient.accessTokens.findOne.query({
            accessTokenId,
          });
          setValue((value) => ({
            ...value,
            isAuthenticated: true,
            username: accessToken.user.username,
          }));
        } catch (error) {
          window.localStorage.removeItem(ACCESS_TOKEN_ID_KEY);
          console.error(error);
        }
      }
      setValue((value) => ({ ...value, isTokenValidated: true }));
    })();
  }, []);

  if (!value.isTokenValidated) {
    return <Heading content="loading..." />;
  }

  return (
    <AuthContext.Provider value={[value, setValue]}>
      {value.isAuthenticated ? children : <Login />}
    </AuthContext.Provider>
  );
};
