// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewRepository = require("../../../../../domain/ReviewRepository");

module.exports = class extends ReviewRepository {
  constructor() {
    super();
  }

  async persist(estateId, reviewEntity) {
    const { userId, nickname, time, rating, kindness, price, contract, title, text } = reviewEntity;
    await client
      .multi()
      .HSET(`reviews:${estateId}:users:${userId}`, "nickname", nickname)
      .HSET(`reviews:${estateId}:users:${userId}`, "time", time)
      .HSET(`reviews:${estateId}:users:${userId}`, "rating", rating)
      .HSET(`reviews:${estateId}:users:${userId}`, "kindness", kindness)
      .HSET(`reviews:${estateId}:users:${userId}`, "price", price)
      .HSET(`reviews:${estateId}:users:${userId}`, "contract", contract)
      .HSET(`reviews:${estateId}:users:${userId}`, "title", title)
      .HSET(`reviews:${estateId}:users:${userId}`, "text", text)
      .exec();
  }

  async get(estateId, userId) {
    const review = await client.HGETALL(`reviews:${estateId}:users:${userId}`);
    return review;
  }

  isEmpty(result) {
    return Object.keys(result).length === 0;
  }
};
