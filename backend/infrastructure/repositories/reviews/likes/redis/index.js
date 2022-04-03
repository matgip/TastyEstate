// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewLikeOrderRepository = require("../../../../../domain/ReviewLikeOrderRepository");

module.exports = class extends ReviewLikeOrderRepository {
  constructor() {
    super();
  }

  async persist(estateId, likeOrderEntity) {
    const { user } = likeOrderEntity;
    await client.connect();
    await client.ZADD(`reviews:${estateId}:likes`, [
      {
        score: 0,
        value: `user:${user}`,
      },
    ]);
    await client.quit();
  }

  async get(estateId, query) {
    const range = query.range.split("-");
    await client.connect();
    const reviewedUsers = await client.ZRANGE_WITHSCORES(
      `reviews:${estateId}:likes`,
      range[0],
      range[range.length - 1]
    );
    await client.quit();
    return reviewedUsers;
  }
};
