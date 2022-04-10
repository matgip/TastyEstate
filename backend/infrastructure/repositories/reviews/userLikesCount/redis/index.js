const client = require("../../../../config/redis/client");
const ReviewUserLikeRepository = require("../../../../../domain/ReviewUserLikeRepository");
const sortedSet = require("../../../../config/redis/sortedSet");

module.exports = class extends ReviewUserLikeRepository {
  constructor() {
    super();
  }

  async persist(estateId, userId, userLikesEntity) {
    const { user } = userLikesEntity;
    const isExist = await this.find(estateId, userId, user);
    if (isExist === true) {
      return { result: sortedSet.toString(sortedSet.ALREADY_ADDED) };
    }
    const result = await client.SADD(`reviews:${estateId}:users:${userId}:likes`, `users:${user}`);
    return { result: sortedSet.toString(result) };
  }

  async find(estateId, userId, userIdToAdd) {
    const result = await client.SISMEMBER(`reviews:${estateId}:users:${userId}:likes`, `users:${userIdToAdd}`);
    return result;
  }
};
