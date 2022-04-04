// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewCountRepository = require("../../../../../domain/ReviewCountRepository");

module.exports = class extends ReviewCountRepository {
  constructor() {
    super();
  }

  async get(estateId) {
    const totUserCnt = await client.ZCARD(`reviews:${estateId}:likes`);
    return totUserCnt;
  }
};
