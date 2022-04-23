// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewRatingRepository = require("../../../../../domain/ReviewRatingRepository");

module.exports = class extends ReviewRatingRepository {
  constructor() {
    super();
  }

  async get(estateId) {
    const totRatings = await client.GET(`reviews:${estateId}:ratings`);
    return totRatings;
  }
};
