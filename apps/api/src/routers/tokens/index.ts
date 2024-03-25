import { trpc } from '../../trpc';
import { createToken } from './createToken';
import { deleteToken } from './deleteToken';
import { fetchToken } from './fetchToken';

export default trpc.router({
  createToken,
  fetchToken,
  deleteToken,
});
