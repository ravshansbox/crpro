import { type Dispatch, type SetStateAction } from 'react';

export type ValueAndAction<Value> = [
  value: Value,
  setValue: Dispatch<SetStateAction<Value>>,
];

export type PropsWithClassName = {
  className?: string;
};

export type PropsWithFormValues<T> = {
  defaultValues: T;
  onSubmit: (values: T) => void | Promise<void>;
};
