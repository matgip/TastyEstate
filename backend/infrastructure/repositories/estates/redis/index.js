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
    // Refactoring: combining likes & stars into estate
    estate.likes = 0;
    estate.stars = 0.0;
    if (!this.isEmpty(estate)) {
      const likes = await client.SCARD("likes:" + estateId);
      const sumOfRatings = await client.GET(`reviews:${estateId}:ratings`);
      const userCnt = await client.ZCARD(`reviews:${estateId}:likes`);

      estate.likes = likes;
      if (userCnt != 0) {
        estate.stars = sumOfRatings / userCnt;
      }
    }
    return estate;
  }

  isEmpty(estate) {
    return !estate.id || !estate.y || !estate.x || !estate.phone || !estate.place_name || !estate.address_name;
  }
};
