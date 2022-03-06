// Reference: https://www.npmjs.com/package/redis
const client = require("../../../db-client/redis/client");

const SADD_SUCCESS = 0;
const ALREADY_ADDED = 1;
const SADD_FAILED = 2;

const int2Str = (cmdInt) => {
  if (cmdInt === ALREADY_ADDED) return "already-added";
  if (cmdInt === SADD_FAILED) return "failed";
  return "success";
};

const getLikes = async (estateID) => {
  await client.connect();
  const likesCnt = await client.SCARD("likes:" + estateID);
  await client.quit();
  return { likes: likesCnt };
};

const addLikes = async (estateID, userID) => {
  await client.connect();
  const alreadyAdded = await client.SISMEMBER(`likes:${estateID}`, `users:${userID}`);
  if (alreadyAdded) {
    client.quit();
    return { cmd_result: int2Str(ALREADY_ADDED) };
  }
  const result = (await client.SADD(`likes:${estateID}`, `users:${userID}`)) === 1 ? SADD_SUCCESS : SADD_FAILED;
  await client.quit();
  return { cmd_result: int2Str(result) };
};

module.exports = {
  getLikes,
  addLikes,
};
