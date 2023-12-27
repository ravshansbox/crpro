import { type FC } from 'react';
import { useGlobalState } from '../GlobalState';
import { trpcReact } from '../trpc';
import { UnitForm } from './UnitForm';

export const NewUnitForm: FC = () => {
  const [globalState] = useGlobalState();
  const units = trpcReact.units.findMany.useQuery(
    { company_id: globalState.selectedCompanyId || '' },
    { enabled: globalState.selectedCompanyId !== undefined },
  );
  const createUnit = trpcReact.units.createOne.useMutation({
    onSuccess: () => units.refetch(),
  });

  return (
    <UnitForm
      className="mx-auto mt-8 w-96"
      defaultValues={{ name: '' }}
      onSubmit={(values) => {
        if (globalState.selectedCompanyId !== undefined) {
          createUnit.mutate({
            ...values,
            company_id: globalState.selectedCompanyId,
          });
        }
      }}
    />
  );
};
