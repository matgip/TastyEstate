// Reference: https://www.npmjs.com/package/redis

const client = require("../../../db-client/redis/client");

const getLikes = async (realEstateID) => {
  let result;
  await client.connect();

  try {
    result = await client.SCARD("likes:" + realEstateID);
  } catch (err) {
    console.log(`SCARD estate command failed: ${err.message}`);
  }

  await client.quit();
  return { likes: result };
};

const addLikes = async (realEstateID, userID) => {
  let result;
  await client.connect();

  try {
    result = await client.SADD(`likes:${realEstateID}`, `users:${userID}`);
  } catch (err) {
    console.log(`SADD user command failed: ${err.message}`);
  }
  await client.quit();
  // Return : 1 => success / 0 => failed
  return { cmd_result: result };
};

module.exports = {
  getLikes,
  addLikes,
};
