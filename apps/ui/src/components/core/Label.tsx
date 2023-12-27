import { type FC, type PropsWithChildren, type ReactNode } from 'react';

type LabelProps = {
  title: ReactNode;
};
export const Label: FC<PropsWithChildren<LabelProps>> = ({
  children,
  title,
}) => {
  return (
    <label className="flex flex-col gap-1">
      <span>{title}</span>
      {children}
    </label>
  );
};
