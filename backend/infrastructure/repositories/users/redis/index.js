// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const UserRepository = require("../../../../domain/UserRepository");

module.exports = class extends UserRepository {
  constructor() {
    super();
  }

  async persist(userEntity) {
    const { id, email, nickname } = userEntity;
    await client.connect();
    await client.multi().HSET(`users:${id}`, "email", email).HSET(`users:${id}`, "nickname", nickname).exec();
    await client.quit();
  }

  async get(userId) {
    await client.connect();
    const user = await client.HGETALL(`users:${userId}`);
    await client.quit();
    return user;
  }

  isEmpty(result) {
    return Object.keys(result).length === 0;
  }
};
