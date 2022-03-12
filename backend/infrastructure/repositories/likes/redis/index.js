// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const sortedSet = require("./sortedSet");
const LikeRepository = require("../../../../domain/LikeRepository");

module.exports = class extends LikeRepository {
  constructor() {
    super();
  }

  async persist(estateId, usrId) {
    const isExist = await this.find(estateId, usrId);
    if (isExist === true) {
      return { cmd_result: sortedSet.toString(sortedSet.ALREADY_ADDED) };
    }
    await client.connect();
    const result = await client.SADD(`likes:${estateId}`, `users:${usrId}`);
    await client.quit();
    return { cmd_result: sortedSet.toString(result) };
  }

  async get(estateId) {
    await client.connect();
    const likesCnt = await client.SCARD("likes:" + estateId);
    await client.quit();
    return { likes: likesCnt };
  }

  async find(estateId, usrId) {
    await client.connect();
    const result = await client.SISMEMBER(`likes:${estateId}`, `users:${usrId}`);
    await client.quit();
    return result;
  }
};
