import { type FC } from 'react';
import { useAuth } from '../Auth';
import { Heading } from '../components/Heading';

export const Dashboard: FC = () => {
  const [auth] = useAuth();

  return <Heading content={auth.username} />;
};
