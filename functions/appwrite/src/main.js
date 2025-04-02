import { Client } from 'node-appwrite';
import { configureRoutes } from './routes/api.js';

export default async ({ req, res }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] || '');

  const router = configureRoutes(client);
  return router.handle(req, res);
};
