// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const UserRepository = require("../../../../domain/UserRepository");

module.exports = class extends UserRepository {
  constructor() {
    super();
  }

  async persist(user) {
    await client.connect();
    client
      .multi()
      .HSET(`users:${user.id}`, "email", user.email)
      .HSET(`users:${user.id}`, "nickname", user.nickname)
      .exec();
    await client.quit();
  }

  async get(userId) {
    await client.connect();
    const user = await client.HGETALL(`users:${userId}`);
    await client.quit();
    return user;
  }

  isEmpty(result) {
    return !result.email || !result.nickname;
  }
};
