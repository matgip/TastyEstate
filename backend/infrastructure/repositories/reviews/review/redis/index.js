// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewRepository = require("../../../../../domain/ReviewRepository");

module.exports = class extends ReviewRepository {
  constructor() {
    super();
  }

  async persist(estateId, reviewEntity) {
    const { userId, rating, kindness, price, contract, text } = reviewEntity;
    await client.connect();
    await client
      .multi()
      .HSET(`reviews:${estateId}:users:${userId}`, "rating", rating)
      .HSET(`reviews:${estateId}:users:${userId}`, "kindness", kindness)
      .HSET(`reviews:${estateId}:users:${userId}`, "price", price)
      .HSET(`reviews:${estateId}:users:${userId}`, "contract", contract)
      .HSET(`reviews:${estateId}:users:${userId}`, "text", text)
      .exec();
    await client.quit();
  }

  async get(estateId, userId) {
    await client.connect();
    const review = await client.HGETALL(`reviews:${estateId}:users:${userId}`);
    await client.quit();
    return review;
  }

  isEmpty(result) {
    return !result.rating || !result.kindness || !result.price || !result.contract || !result.text;
  }
};
