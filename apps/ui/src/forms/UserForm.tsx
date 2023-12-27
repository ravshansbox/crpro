import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { Button, Form } from '../components/core';
import { type PropsWithClassName, type PropsWithFormValues } from '../types';

type UserFormValues = {
  username: string;
  password: string;
};
export const UserForm: FC<
  PropsWithClassName & PropsWithFormValues<UserFormValues> & { action: string }
> = ({ className, defaultValues, onSubmit, action }) => {
  const form = useForm({ defaultValues });

  useEffect(() => {
    form.setFocus('username');
  }, []);

  return (
    <Form
      className={className}
      autoComplete="off"
      onSubmit={form.handleSubmit(async (values) => {
        const result = onSubmit(values);
        if (result instanceof Promise) {
          await result;
        }
        form.setFocus('username');
        form.reset();
      })}
    >
      <FormField title="Username" type="text" {...form.register('username')} />
      <FormField
        title="Password"
        type="password"
        {...form.register('password')}
      />
      <Button type="submit" variant="primary">
        {action}
      </Button>
    </Form>
  );
};
