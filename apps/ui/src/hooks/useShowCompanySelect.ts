import { useEffect } from 'react';
import { useGlobalState } from '../GlobalState';

export const useShowCompanySelect = () => {
  const [, setGlobalState] = useGlobalState();

  useEffect(() => {
    setGlobalState((globalState) => ({
      ...globalState,
      isCompanySelectVisible: true,
    }));

    return () => {
      setGlobalState((globalState) => ({
        ...globalState,
        isCompanySelectVisible: false,
      }));
    };
  }, []);
};
