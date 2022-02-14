// Reference: https://www.npmjs.com/package/redis

const client = require("../../../db-client/redis/client");

const isEmptyReply = (result) => {
  return result.place_name === undefined || result.phone_number === undefined;
};

const getEstate = async (estateID) => {
  let result;
  await client.connect();

  try {
    result = await client.HGETALL("estates:" + estateID);
  } catch (err) {
    console.log(`HGET estate command failed: ${err.message}`);
  }

  await client.quit();
  return result;
};

const addEstate = async (estate) => {
  let HTTP_STATUS = 200;
  await client.connect();

  Promise.all([
    client.HSET("estates:" + estate.id, "place_name", estate.place_name),
    client.HSET("estates:" + estate.id, "phone_number", estate.phone_number),
  ])
    .then(() => {
      console.log("HSET estate command success");
    })
    .catch((err) => {
      console.log(`HSET estate command failed: ${err.message}`);
      HTTP_STATUS = 500;
    });

  await client.quit();
  return HTTP_STATUS;
};

module.exports = {
  isEmptyReply,
  getEstate,
  addEstate,
};
