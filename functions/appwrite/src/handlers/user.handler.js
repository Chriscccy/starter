import { success, fail } from '../core/response.js';
import { Users } from 'node-appwrite';

export class UserHandler {
  constructor(client) {
    this.users = new Users(client);
  }

  async get(req, res) {
    try {
      const user = await this.users.get(req.params.id);
      return success(res, {
        id: user.$id,
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      return fail(res, err);
    }
  }

  async update(req, res) {
    try {
      const updated = await this.users.update(req.params.id, req.body);
      return success(res, updated);
    } catch (err) {
      return fail(res, err);
    }
  }
}
