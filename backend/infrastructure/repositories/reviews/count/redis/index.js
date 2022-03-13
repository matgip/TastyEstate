// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const ReviewCountRepository = require("../../../../../domain/ReviewCountRepository");

module.exports = class extends ReviewCountRepository {
  constructor() {
    super();
  }

  async get(estateId) {
    await client.connect();
    const totUserCnt = await client.ZCARD(`reviews:${estateId}:likes`);
    await client.quit();
    return totUserCnt;
  }
};
