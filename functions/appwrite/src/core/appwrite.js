import { Client, Users, Databases, Storage } from 'node-appwrite';

/**
 * 初始化 Appwrite 客户端
 * @param {object} req - Appwrite 函数请求对象
 * @returns {Client} 配置好的 Appwrite 客户端
 * @throws {Error} 当缺少必要环境变量时抛出异常
 */
export function initAppwriteClient(req) {
  // 验证环境变量
  const endpoint = process.env.APPWRITE_FUNCTION_ENDPOINT;
  const projectId = process.env.APPWRITE_FUNCTION_PROJECT_ID;
  const apiKey = req.headers['x-appwrite-key'];

  if (!endpoint || !projectId) {
    throw new Error(
      'Missing required environment variables: ' +
        'APPWRITE_FUNCTION_ENDPOINT and APPWRITE_FUNCTION_PROJECT_ID must be set'
    );
  }

  if (!apiKey) {
    throw new Error('Missing API key in x-appwrite-key header');
  }

  // 初始化客户端
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return client;
}

/**
 * 获取所有 Appwrite 服务实例
 * @param {Client} client - 已初始化的 Appwrite 客户端
 * @returns {object} 包含所有服务的对象
 */
export function getAppwriteServices(client) {
  return {
    users: new Users(client),
    db: new Databases(client),
    storage: new Storage(client),
    // 添加其他需要的服务...
  };
}

/**
 * 安全获取环境变量
 * @param {string} key - 环境变量名
 * @param {any} [defaultValue] - 默认值
 * @returns {string}
 * @throws {Error} 当环境变量未设置且无默认值时抛出
 */
export function getEnv(key, defaultValue) {
  const value = process.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value || defaultValue;
}
