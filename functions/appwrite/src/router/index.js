import { setupPingRoutes } from './ping.js';
import { setupUserRoutes } from './user.js';

export function initRoutes(client) {
  return {
    users: setupUserRoutes(client),
    // 可以添加其他路由模块
    // auth: setupAuthRoutes(client),
    ping: setupPingRoutes(client),
  };
}
