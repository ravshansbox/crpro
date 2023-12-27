import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { Button, Form } from '../components/core';
import { type PropsWithClassName, type PropsWithFormValues } from '../types';

type CompanyFormValues = {
  name: string;
};
export const CompanyForm: FC<
  PropsWithClassName & PropsWithFormValues<CompanyFormValues>
> = ({ className, defaultValues, onSubmit }) => {
  const form = useForm({ defaultValues });

  useEffect(() => {
    form.setFocus('name');
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
        form.setFocus('name');
        form.reset();
      })}
    >
      <FormField title="Name" type="text" {...form.register('name')} />
      <Button type="submit" variant="primary">
        Create
      </Button>
    </Form>
  );
};
