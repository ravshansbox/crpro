import { type FC } from 'react';
import { trpcReact } from '../trpc';
import { CompanyForm } from './CompanyForm';

export const NewCompanyForm: FC = () => {
  const companies = trpcReact.companies.findMany.useQuery();
  const createCompany = trpcReact.companies.createOne.useMutation({
    onSuccess: () => companies.refetch(),
  });

  return (
    <CompanyForm
      className="mx-auto mt-8 w-96"
      defaultValues={{ name: '' }}
      onSubmit={createCompany.mutate}
    />
  );
};
