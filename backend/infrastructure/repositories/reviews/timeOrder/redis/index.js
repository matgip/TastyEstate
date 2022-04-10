const client = require("../../../../config/redis/client");
const ReviewTimeOrderRepository = require("../../../../../domain/ReviewTimeOrderRepository");

module.exports = class extends ReviewTimeOrderRepository {
  constructor() {
    super();
  }

  async persist(estateId, timeOrderEntity) {
    const { user } = timeOrderEntity;
    await client.ZADD(`reviews:${estateId}:time`, [
      {
        score: Math.floor(new Date().getTime() / 1000),
        value: `user:${user}`,
      },
    ]);
  }

  async get(estateId, query) {
    const range = query.range.split("~");
    const reviewedUsers = await client.ZRANGE_WITHSCORES(`reviews:${estateId}:time`, range[0], range[range.length - 1]);
    return reviewedUsers;
  }
};
