import { type FC, type PropsWithChildren } from 'react';
import { NavLink as NavLinkCore } from 'react-router-dom';
import { wx } from 'windstitch';

const className = wx({
  className: 'text-blue-600 visited:text-blue-600 hover:underline',
  variants: {
    isActive: (isActive: boolean) => (isActive ? 'underline' : ''),
  },
});

export const NavLink: FC<PropsWithChildren<{ to: string }>> = ({
  to,
  children,
}) => (
  <NavLinkCore className={className} to={to}>
    {children}
  </NavLinkCore>
);
