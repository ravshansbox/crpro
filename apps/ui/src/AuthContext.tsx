import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';

type ContextValue = {
  authorized: boolean;
};

const AuthContext = createContext<ContextValue>({
  authorized: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value] = useState<ContextValue>({
    authorized: false,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
