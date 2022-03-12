// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const EstateRepository = require("../../../../domain/EstateRepository");

module.exports = class extends EstateRepository {
  constructor() {
    super();
  }

  async persist(estate) {
    await client.connect();
    client
      .multi()
      .HSET(`estates:${estate.id}`, "place_name", estate.place_name)
      .HSET(`estates:${estate.id}`, "phone_number", estate.phone_number)
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
