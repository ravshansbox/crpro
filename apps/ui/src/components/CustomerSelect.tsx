import { forwardRef, type FocusEventHandler } from 'react';
import { type ChangeHandler } from 'react-hook-form';
import { useGlobalState } from '../GlobalState';
import { trpcReact } from '../trpc';
import { Select } from './Select';
import { Label } from './core';

type CustomerSelectProps = {
  title: string;
  name?: string;
  value?: string;
  onChange: ChangeHandler;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
};
export const CustomerSelect = forwardRef<
  HTMLSelectElement,
  CustomerSelectProps
>(({ title, ...props }, ref) => {
  const [globalState] = useGlobalState();
  const customers = trpcReact.customers.findMany.useQuery(
    { company_id: globalState.selectedCompanyId || '' },
    { enabled: globalState.selectedCompanyId !== undefined },
  );

  if (!globalState.isCompanySelectVisible || !customers.data) {
    return null;
  }

  return (
    <Label title={title}>
      <Select ref={ref} options={customers.data} {...props} />
    </Label>
  );
});
