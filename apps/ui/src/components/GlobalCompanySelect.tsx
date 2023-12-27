import { type FC } from 'react';
import { useGlobalState } from '../GlobalState';
import { trpcReact } from '../trpc';
import { Select } from './Select';

export const GlobalCompanySelect: FC = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const companies = trpcReact.companies.findMany.useQuery(undefined, {
    onSuccess: (companies) => {
      if (companies.length > 0) {
        const selectedCompanyId = companies[0].id;
        setGlobalState((value) => ({ ...value, selectedCompanyId }));
      }
    },
  });

  if (!globalState.isCompanySelectVisible || !companies.data) {
    return null;
  }

  return (
    <Select
      options={companies.data}
      value={globalState.selectedCompanyId}
      onChange={(event) => {
        const selectedCompanyId = event.target.value;
        window.setTimeout(() => {
          setGlobalState((value) => ({ ...value, selectedCompanyId }));
        }, 0);
      }}
      aria-label="Company"
    />
  );
};
