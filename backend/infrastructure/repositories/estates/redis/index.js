// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");

const isEmpty = (result) => {
  return result.place_name === undefined || result.phone_number === undefined;
};

const getEstate = async (id) => {
  await client.connect();
  const estate = await client.HGETALL("estates:" + id);
  await client.quit();
  return estate;
};

const addEstate = async (e) => {
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
