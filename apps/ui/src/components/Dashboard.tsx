import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import { trpcVanillaClient } from '../trpc';
import { Button } from './core/Button';

export const Dashboard = () => {
  const authContent = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    authContent.update({ isAuthTriggered: true });
    const token = window.localStorage.getItem('TOKEN');
    if (token === null) {
      navigate('/login');
      return;
    }
    trpcVanillaClient.tokens.fetchToken
      .query({ id: token })
      .then((accessToken) => {
        authContent.update({ username: accessToken.user.username });
      })
      .catch(() => {
        window.localStorage.removeItem('TOKEN');
        navigate('/login');
      });
  }, []);

  return (
    <main>
      <h1>Welcome {authContent.state.username}</h1>
      <Button color="gray" size="xs" onClick={authContent.logout}>
        log out
      </Button>
    </main>
  );
};
