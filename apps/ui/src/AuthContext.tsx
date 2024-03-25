import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { trpcVanillaClient } from './trpc';

type ContextState = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isAuthTriggered: boolean;
  tokenId: string | null;
  username: string | null;
};

const defaultValue: ContextState = {
  isAuthenticated: false,
  isAuthenticating: false,
  isAuthTriggered: false,
  tokenId: null,
  username: null,
};

type ContextType = {
  state: ContextState;
  update: (value: Partial<ContextState>) => void;
  logout: () => void;
};

const AuthContext = createContext<ContextType>({
  state: defaultValue,
  update: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<ContextState>(defaultValue);

  return (
    <AuthContext.Provider
      value={{
        state,
        update: (partial) => {
          setState((value) => ({ ...value, ...partial }));
        },
        logout: async () => {
          if (!state.tokenId) return;
          await trpcVanillaClient.tokens.deleteToken.mutate({
            id: state.tokenId,
          });
          setState(defaultValue);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
