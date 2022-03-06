// Reference: https://www.npmjs.com/package/redis
const client = require("../../../db-client/redis/client");

const isEmpty = (result) => {
  return result.place_name === undefined || result.phone_number === undefined;
};

const getEstate = async (id) => {
  await client.connect();
  const estate = await client.HGETALL("estates:" + id);
  await client.quit();
  return estate;
};

const addEstate = async (estate) => {
  await client.connect();
  client.HSET("estates:" + estate.id, "place_name", estate.place_name);
  client.HSET("estates:" + estate.id, "phone_number", estate.phone_number);
  await client.quit();
};

module.exports = {
  isEmpty,
  getEstate,
  addEstate,
};
