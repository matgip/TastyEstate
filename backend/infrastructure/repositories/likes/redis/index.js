// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");
const sortedSet = require("./sortedSet");

const getLikes = async (estateId) => {
  await client.connect();
  const likesCnt = await client.SCARD("likes:" + estateId);
  await client.quit();
  return { likes: likesCnt };
};

const addLikes = async (estateId, usrId) => {
  await client.connect();
  const isExist = await client.SISMEMBER(`likes:${estateId}`, `users:${usrId}`);
  if (isExist === true) {
    client.quit();
    return { cmd_result: sortedSet.toString(sortedSet.ALREADY_ADDED) };
  }
  const result = await client.SADD(`likes:${estateId}`, `users:${usrId}`);
  await client.quit();
  return { cmd_result: sortedSet.toString(result) };
};

module.exports = {
  getLikes,
  addLikes,
};
