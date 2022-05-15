// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const UserRepository = require("../../../../domain/UserRepository");

module.exports = class extends UserRepository {
  constructor() {
    super();
  }

  async persist(userEntity) {
    const { id, email, nickname, avatar, ageRange } = userEntity;
    await client
      .multi()
      .HSET(`users:${id}`, "id", id)
      .HSET(`users:${id}`, "email", email)
      .HSET(`users:${id}`, "nickname", nickname)
      .HSET(`users:${id}`, "avatar", avatar)
      .HSET(`users:${id}`, "ageRange", ageRange)
      .exec();
  }

  async get(userId) {
    const user = await client.HGETALL(`users:${userId}`);
    return user;
  }

  isEmpty(result) {
    return Object.keys(result).length === 0;
  }
};
