// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const EstateRepository = require("../../../../domain/EstateRepository");

module.exports = class extends EstateRepository {
  constructor() {
    super();
  }

  async persist(estateEntity) {
    const { id, placeName, phoneNumber } = estateEntity;
    await client.connect();
    await client
      .multi()
      .HSET(`estates:${id}`, "place_name", placeName)
      .HSET(`estates:${id}`, "phone_number", phoneNumber)
      .exec();
    await client.quit();
  }

  async get(estateId) {
    await client.connect();
    const estate = await client.HGETALL(`estates:${estateId}`);
    await client.quit();
    return estate;
  }

  isEmpty(result) {
    return !result.place_name || !result.phone_number;
  }
};
