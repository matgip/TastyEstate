// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewRatingRepository = require("../../../../../domain/ReviewRatingRepository");

module.exports = class extends ReviewRatingRepository {
  constructor() {
    super();
  }

  async persist(estateId, ratingEntity) {
    const { rating } = ratingEntity;
    await client.INCRBYFLOAT(`reviews:${estateId}:ratings`, rating);
  }

  async get(estateId) {
    const totRatings = await client.GET(`reviews:${estateId}:ratings`);
    return totRatings;
  }
};
