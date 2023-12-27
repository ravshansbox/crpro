import { HTTP_PORT } from './constants';
import { httpServer } from './httpServer';
import { seedDatabase } from './seedDatabase';

(async () => {
  await seedDatabase();
  const { port } = httpServer.listen(parseInt(HTTP_PORT));
  console.info(`Listening on port ${port}`);
})();
