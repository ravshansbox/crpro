import { w } from 'windstitch';

export const Button = w('button', {
  className: 'border-solid border cursor-pointer py-1 px-2 duration-200',
  variants: {
    variant: {
      default: 'bg-transparent border-slate-300 hover:bg-slate-100',
      primary:
        'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700',
      link: 'border-none text-blue-600 p-0 hover:bg-transparent hover:underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
