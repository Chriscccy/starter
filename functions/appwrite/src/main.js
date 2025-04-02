import { Client } from 'node-appwrite';
import { initRoutes } from './router/index.js';

export default async ({ req, res, log, error }) => {
  // 初始化客户端
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');

  // 初始化路由
  const routes = initRoutes(client);

  try {
    // 解析请求路径
    const [_, route, action, ...params] = req.path.split('/');

    // 路由处理
    switch (route) {
      case 'users':
        return await handleUserRoutes(req, res, routes.users, action, params);

      case 'ping':
        return res.text('Pong');

      default:
        return res.json({
          message: '欢迎使用Appwrite函数API',
          availableRoutes: [
            '/users/get/:userId',
            '/users/email/:email',
            '/users/list',
            '/ping',
          ],
        });
    }
  } catch (err) {
    error(err.message);
    return res.json({ error: err.message }, 500);
  }
};

// 用户路由处理函数
async function handleUserRoutes(req, res, userRoutes, action, params) {
  switch (action) {
    case 'get':
      const userId = params[0] || req.query.userId;
      if (!userId) throw new Error('需要提供用户ID');
      const user = await userRoutes.getUserById(userId);
      return res.json(user);

    case 'email':
      const email = params[0] || req.query.email;
      if (!email) throw new Error('需要提供邮箱地址');
      const userByEmail = await userRoutes.getUserByEmail(email);
      return res.json(userByEmail);

    case 'list':
      const queries = req.query.queries ? JSON.parse(req.query.queries) : [];
      const users = await userRoutes.listUsers(queries);
      return res.json(users);

    default:
      throw new Error('无效的用户操作');
  }
}
