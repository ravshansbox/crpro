import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../trpc';
import { Button } from './core/Button';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const createToken = trpc.tokens.createToken.useMutation({
    onSuccess: (token) => {
      window.localStorage.setItem('TOKEN', token.id);
      navigate('/');
    },
  });

  return (
    <form
      className="mt-16 mx-auto max-w-96 border p-16 rounded-xl flex flex-col gap-4"
      onSubmit={handleSubmit((values) => {
        createToken.mutate(values);
      })}
    >
      <label>
        <span>Username:</span>
        <input
          type="text"
          className="border w-full rounded"
          {...register('username')}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="text"
          className="border w-full rounded"
          {...register('password')}
        />
      </label>
      <Button type="submit" color="gray" full>
        Submit
      </Button>
    </form>
  );
};
