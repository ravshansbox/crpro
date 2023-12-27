import {
  forwardRef,
  type ChangeEventHandler,
  type FocusEventHandler,
  type HTMLInputTypeAttribute,
} from 'react';
import { Input, Label } from './core';

type FormFieldProps = {
  title: string;
  name: string;
  type: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
};
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ title, ...props }, ref) => {
    return (
      <Label title={title}>
        <Input ref={ref} {...props} />
      </Label>
    );
  },
);
