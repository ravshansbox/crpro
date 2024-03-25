import { trpc } from '../../trpc';
import { createOne } from './createOne';
import { deleteOne } from './deleteOne';
import { fetchMany } from './fetchMany';
import { updateOne } from './updateOne';

export default trpc.router({
  createOne,
  deleteOne,
  fetchMany,
  updateOne,
});
