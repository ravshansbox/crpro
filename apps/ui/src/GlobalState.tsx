import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { type ValueAndAction } from './types';

type GlobalStateValue = {
  selectedCompanyId?: string;
  isCompanySelectVisible: boolean;
};

const initialValue: GlobalStateValue = {
  selectedCompanyId: undefined,
  isCompanySelectVisible: false,
};

const GlobalStateContext = createContext<ValueAndAction<GlobalStateValue>>([
  initialValue,
  () => {},
]);

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [value, setValue] = useState<GlobalStateValue>(initialValue);

  return (
    <GlobalStateContext.Provider value={[value, setValue]}>
      {children}
    </GlobalStateContext.Provider>
  );
};
