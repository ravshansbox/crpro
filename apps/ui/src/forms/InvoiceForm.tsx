import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalState } from '../GlobalState';
import { CustomerSelect } from '../components/CustomerSelect';
import { FormField } from '../components/FormField';
import { Button, Form } from '../components/core';
import { type PropsWithClassName, type PropsWithFormValues } from '../types';

type InvoiceFormValues = {
  due_date: string;
  customer_id?: string;
};
export const InvoiceForm: FC<
  PropsWithClassName & PropsWithFormValues<InvoiceFormValues>
> = ({ className, defaultValues, onSubmit }) => {
  const [globalState] = useGlobalState();
  const form = useForm({ defaultValues });

  useEffect(() => {
    if (globalState.selectedCompanyId !== undefined) {
      form.setFocus('due_date');
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
        form.setFocus('due_date');
        form.reset();
      })}
    >
      <FormField title="Due date" type="date" {...form.register('due_date')} />
      <CustomerSelect title="Customer" {...form.register('customer_id')} />
      <Button type="submit" variant="primary">
        Create
      </Button>
    </Form>
  );
};
