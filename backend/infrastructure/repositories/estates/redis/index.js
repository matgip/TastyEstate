// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const EstateRepository = require("../../../../domain/EstateRepository");

module.exports = class extends EstateRepository {
  constructor() {
    super();
  }

  async persist(estateEntity) {
    const { id, coordinate, placeName, phone, addressName } = estateEntity;
    await client
      .multi()
      .HSET(`estates:${id}`, "id", id)
      .HSET(`estates:${id}`, "y", coordinate.y)
      .HSET(`estates:${id}`, "x", coordinate.x)
      .HSET(`estates:${id}`, "phone", phone)
      .HSET(`estates:${id}`, "place_name", placeName)
      .HSET(`estates:${id}`, "address_name", addressName)
      .exec();
  }

  async get(estateId) {
    const estate = await client.HGETALL(`estates:${estateId}`);
    // Refactoring: combining likes count into estate
    if (!this.isEmpty(estate)) {
      const estateLikes = await client.SCARD("likes:" + estateId);
      estate.likes = estateLikes;
    }
    return estate;
  }

  isEmpty(result) {
    return Object.keys(result).length === 0;
  }
};
