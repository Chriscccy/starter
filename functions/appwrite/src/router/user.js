import { Users } from 'node-appwrite';

export function setupUserRoutes(client) {
  const users = new Users(client);

  return {
    /**
     * 通过ID获取用户
     */
    async getUserById(userId) {
      try {
        return await users.get(userId);
      } catch (err) {
        throw new Error(`获取用户失败: ${err.message}`);
      }
    },

    /**
     * 通过邮箱获取用户
     */
    async getUserByEmail(email) {
      try {
        const response = await users.list();
        const user = response.users.find((u) => u.email === email);
        if (!user) throw new Error('用户未找到');
        return user;
      } catch (err) {
        throw new Error(`通过邮箱查找用户失败: ${err.message}`);
      }
    },

    /**
     * 列出所有用户（带分页）
     */
    async listUsers(queries = []) {
      try {
        return await users.list(queries);
      } catch (err) {
        throw new Error(`列出用户失败: ${err.message}`);
      }
    },
  };
}
