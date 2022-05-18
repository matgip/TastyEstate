// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const AgencyRepository = require("../../../../domain/AgencyRepository");

module.exports = class extends AgencyRepository {
  constructor() {
    super();
  }

  async persist(entity) {
    const { id, y, x, place_name, phone, address_name, road_address_name } = entity;
    console.log("agencies persist : " + id + " (" + y + ", " + x + ") " + place_name + " : " + address_name);
    await client
      .multi()
      .HSET(`agencies:${id}`, "id", id)
      .HSET(`agencies:${id}`, "y", y)
      .HSET(`agencies:${id}`, "x", x)
      .HSET(`agencies:${id}`, "phone", phone)
      .HSET(`agencies:${id}`, "place_name", place_name)
      .HSET(`agencies:${id}`, "address_name", address_name)
      .HSET(`agencies:${id}`, "road_address_name", road_address_name)
      .geoAdd(`agencies`, {
        longitude: x,
        latitude: y,
        member: id,
      })
      .exec();
  }

  async searchByRadius(lat, lng, radius) {
    const ids = await client.GEOSEARCH("agencies", { latitude: lat, longitude: lng }, { radius: radius, unit: "m" });
    const agencies = [];
    // for (let i = 0; i < ids.length; i++)
    //   agencies.push(await this.get(ids[i]));
    await Promise.all(
      ids.map(async (id) => {
        agencies.push(await this.get(id));
      })
    );
    return agencies;
  }

  async get(agencyId) {
    const agency = await client.HGETALL(`agencies:${agencyId}`);
    // Refactoring: combining likes & stars into agency
    agency.likes = 0;
    agency.stars = 0.0;
    if (!this.isEmpty(agency)) {
      const likes = await client.SCARD("likes:" + agencyId);
      const sumOfRatings = await client.GET(`reviews:${agencyId}:ratings`);
      const userCnt = await client.ZCARD(`reviews:${agencyId}:likes`);

      agency.likes = likes;
      if (userCnt != 0) {
        agency.stars = sumOfRatings / userCnt;
      }
    }
    return agency;
  }

  isEmpty(agency) {
    return !agency.id || !agency.y || !agency.x || !agency.phone || !agency.place_name || !agency.address_name;
  }
};
