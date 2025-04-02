import { initAppwriteClient, getServices } from './core/appwrite.js';
import { initRoutes } from './routes/index.js';

export default async ({ req, res, log, error }) => {
  try {
    const client = initAppwriteClient(req);
    const services = getServices(client);
    const routes = initRoutes(services);

    // 路由分发
    const [_, resource, action] = req.path.split('/');

    switch (resource) {
      default:
        return res.json({
          status: 1,
          message: 'Available endpoints',
          endpoints: ['/users/getInfo', '/ping'],
        });
    }
  } catch (err) {
    error(err.message);
    return res.json(
      {
        status: 1,
        message: 'Internal server error',
      },
      500
    );
  }
};
