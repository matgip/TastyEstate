// Reference: https://www.npmjs.com/package/redis

const client = require("../../../db-client/redis/client");

const SADD_SUCCESS = 0;
const ALREADY_ADDED = 1;
const SADD_FAILED = 2;

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

const int2Str = (cmdInt) => {
  if (cmdInt === ALREADY_ADDED) return "already-added";
  if (cmdInt === SADD_FAILED) return "failed";
  return "success";
};

const addLikes = async (realEstateID, userID) => {
  let result;
  await client.connect();

  try {
    const alreadyAdded = await client.SISMEMBER(`likes:${realEstateID}`, `users:${userID}`);
    if (alreadyAdded) {
      client.quit();
      return { cmd_result: int2Str(ALREADY_ADDED) };
    }

    result = (await client.SADD(`likes:${realEstateID}`, `users:${userID}`)) === 1 ? SADD_SUCCESS : SADD_FAILED;
  } catch (err) {
    console.log(`SADD user command failed: ${err.message}`);
  }
  await client.quit();
  return { cmd_result: int2Str(result) };
};

module.exports = {
  getLikes,
  addLikes,
};
