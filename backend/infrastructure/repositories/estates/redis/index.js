// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const EstateRepository = require("../../../../domain/EstateRepository");

module.exports = class extends EstateRepository {
  constructor() {
    super();
  }

  async persist(entity) {
    const { id, y, x, place_name, phone, address_name, road_address_name } = entity;
    console.log("estates persist : " + id + " (" + y + ", " + x + ") " + place_name + " : " + address_name)
    await client
      .multi()
      .HSET(`estates:${id}`, "id", id)
      .HSET(`estates:${id}`, "y", y)
      .HSET(`estates:${id}`, "x", x)
      .HSET(`estates:${id}`, "phone", phone)
      .HSET(`estates:${id}`, "place_name", place_name)
      .HSET(`estates:${id}`, "address_name", address_name)
      .HSET(`estates:${id}`, "road_address_name", road_address_name)
      .geoAdd(`estates`, {
        longitude: x,
        latitude: y,
        member: id
      })
      .exec();
  }

  async searchByRadius(lat, lng, radius) {
    const ids = await client.GEOSEARCH("estates", { latitude: lat, longitude: lng }, { radius: radius, unit: "m" })
    const estates = [];
    for (let i = 0; i < ids.length; i++)
      estates.push(await this.get(ids[i]));
    return estates;
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
