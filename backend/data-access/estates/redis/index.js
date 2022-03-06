// Reference: https://www.npmjs.com/package/redis
const client = require("../../../db-config/redis/client");

const isEmpty = (result) => {
  return result.place_name === undefined || result.phone_number === undefined;
};

const getEstate = async (id) => {
  if (!id) {
    throw new Error("estate id not provided");
  }
  await client.connect();
  const estate = await client.HGETALL("estates:" + id);
  await client.quit();
  return estate;
};

const addEstate = async (e) => {
  if (!e) {
    throw new Error("estate is not provided");
  }
  if (!e.id || !e.place_name || !e.phone_number) {
    throw new Error("invalid estate object");
  }

  await client.connect();
  client
    .multi()
    .HSET("estates:" + e.id, "place_name", e.place_name)
    .HSET("estates:" + e.id, "phone_number", e.phone_number)
    .exec();
  await client.quit();
};

module.exports = {
  isEmpty,
  getEstate,
  addEstate,
};
