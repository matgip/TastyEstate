// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const EstateRepository = require("../../../../domain/EstateRepository");

module.exports = class extends EstateRepository {
  constructor() {
    super();
  }

  async persist(estateEntity) {
    const { id, placeName, phoneNumber } = estateEntity;
    await client
      .multi()
      .HSET(`estates:${id}`, "place_name", placeName)
      .HSET(`estates:${id}`, "phone_number", phoneNumber)
      .exec();
  }

  async get(estateId) {
    const estate = await client.HGETALL(`estates:${estateId}`);
    return estate;
  }

  isEmpty(result) {
    return Object.keys(result).length === 0;
  }
};
