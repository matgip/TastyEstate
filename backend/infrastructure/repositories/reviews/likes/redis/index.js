// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewLikeOrderRepository = require("../../../../../domain/ReviewLikeOrderRepository");
const zset = require("./zset");

module.exports = class extends ReviewLikeOrderRepository {
  constructor() {
    super();
  }

  async persist(estateId, likeOrderEntity) {
    const { user } = likeOrderEntity;
    await client.connect();
    const result = await client.ZADD(`reviews:${estateId}:likes`, [
      {
        score: 0,
        value: `user:${user}`,
      },
    ]);
    await client.quit();
    return { cmd_result: zset.toString(result) };
  }
};
