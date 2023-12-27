import { type FC } from 'react';
import { useAuth } from '../Auth';
import { ACCESS_TOKEN_ID_KEY } from '../constants';
import { UserForm } from '../forms/UserForm';
import { trpcReact } from '../trpc';

export const Login: FC = () => {
  const [, setAuth] = useAuth();
  const createAccessToken = trpcReact.accessTokens.createOne.useMutation({
    onSuccess: (accessToken) => {
      window.localStorage.setItem(ACCESS_TOKEN_ID_KEY, accessToken.id);
      setAuth((value) => ({
        ...value,
        isAuthenticated: true,
        username: accessToken.user.username,
      }));
    },
  });

  return (
    <div className="mx-auto mt-8 flex w-96 flex-col gap-4">
      <h1 className="text-center text-2xl">Authentication</h1>
      <UserForm
        action="Login"
        defaultValues={{ username: '', password: '' }}
        onSubmit={createAccessToken.mutate}
      />
    </div>
  );
};
