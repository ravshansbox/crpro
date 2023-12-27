import { forwardRef, type ForwardedRef } from 'react';
import { classNames } from '../utils';

type SelectProps<Option> = JSX.IntrinsicElements['select'] & {
  options: Option[];
};
export const Select = forwardRef(function Select<
  Option extends { id: string; name: string },
>(
  { options, className, ...props }: SelectProps<Option>,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  return (
    <select
      ref={ref}
      className={classNames(
        'border border-slate-300 px-2 py-1 duration-200 hover:border-slate-400',
        className,
      )}
      {...props}
    >
      {options.map((option, index) => (
        <option key={index} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
});
