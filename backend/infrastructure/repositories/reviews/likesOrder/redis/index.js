// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewLikeOrderRepository = require("../../../../../domain/ReviewLikeOrderRepository");

module.exports = class extends ReviewLikeOrderRepository {
  constructor() {
    super();
  }

  async update(estateId, userId) {
    const { user, count } = userId;
    await client.ZINCRBY(`reviews:${estateId}:likes`, count, `user:${user}`);
  }

  async get(estateId, query) {
    const range = query.range.split("~");
    const reviewedUsers = await client.ZRANGE_WITHSCORES(
      `reviews:${estateId}:likes`,
      range[0],
      range[range.length - 1]
    );
    return reviewedUsers;
  }
};
