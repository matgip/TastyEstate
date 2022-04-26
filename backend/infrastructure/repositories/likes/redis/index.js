// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const sortedSet = require("../../../config/redis/sortedSet");
const LikeRepository = require("../../../../domain/LikeRepository");

module.exports = class extends LikeRepository {
  constructor() {
    super();
  }

  async persist(estateId, usrId) {
    const isExist = await this.find(estateId, usrId);
    if (isExist === true) {
      return { result: sortedSet.toString(sortedSet.ALREADY_ADDED) };
    }
    const result = await client.SADD(`likes:${estateId}`, `users:${usrId}`);
    return { result: sortedSet.toString(result) };
  }

  // async get(estateId) {
  //   const likesCnt = await client.SCARD("likes:" + estateId);
  //   return { likes: likesCnt };
  // }

  async find(estateId, usrId) {
    const result = await client.SISMEMBER(`likes:${estateId}`, `users:${usrId}`);
    return result;
  }
};
