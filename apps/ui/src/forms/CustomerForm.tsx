import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalState } from '../GlobalState';
import { FormField } from '../components/FormField';
import { Button, Form } from '../components/core';
import { type PropsWithClassName, type PropsWithFormValues } from '../types';

type CustomerFormValues = {
  name: string;
};
export const CustomerForm: FC<
  PropsWithClassName & PropsWithFormValues<CustomerFormValues>
> = ({ className, defaultValues, onSubmit }) => {
  const [globalState] = useGlobalState();
  const form = useForm({ defaultValues });

  useEffect(() => {
    if (globalState.selectedCompanyId !== undefined) {
      form.setFocus('name');
    }
  }, [globalState.selectedCompanyId]);

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
