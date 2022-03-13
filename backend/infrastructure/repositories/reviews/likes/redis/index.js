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
};
