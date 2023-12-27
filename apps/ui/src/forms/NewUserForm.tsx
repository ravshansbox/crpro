import { type FC } from 'react';
import { trpcReact } from '../trpc';
import { UserForm } from './UserForm';

export const NewUserForm: FC = () => {
  const users = trpcReact.users.findMany.useQuery();
  const createUser = trpcReact.users.createOne.useMutation({
    onSuccess: () => users.refetch(),
  });

  return (
    <UserForm
      className="mx-auto mt-8 w-96"
      action="Create"
      defaultValues={{ username: '', password: '' }}
      onSubmit={createUser.mutate}
    />
  );
};
