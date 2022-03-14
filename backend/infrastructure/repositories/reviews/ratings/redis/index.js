// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewRatingRepository = require("../../../../../domain/ReviewRatingRepository");

module.exports = class extends ReviewRatingRepository {
  constructor() {
    super();
  }

  async persist(estateId, ratingEntity) {
    const { rating } = ratingEntity;
    await client.connect();
    await client.INCRBYFLOAT(`reviews:${estateId}:ratings`, rating);
    await client.quit();
  }

  async get(estateId) {
    await client.connect();
    const totRatings = await client.GET(`reviews:${estateId}:ratings`);
    await client.quit();
    return totRatings;
  }
};