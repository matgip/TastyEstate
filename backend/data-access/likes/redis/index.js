// Reference: https://www.npmjs.com/package/redis
const client = require("../../../db-config/redis/client");
const sortedSet = require("./result");

const getLikes = async (estateID) => {
  if (!estateID) {
    throw new Error("estate id not provided");
  }
  await client.connect();
  const likesCnt = await client.SCARD("likes:" + estateID);
  await client.quit();
  return { likes: likesCnt };
};

const addLikes = async (estateID, usrID) => {
  if (!estateID || !usrID) {
    throw new Error("estate id and user id should be provided");
  }
  await client.connect();
  const isExist = await client.SISMEMBER(`likes:${estateID}`, `users:${usrID}`);
  if (isExist === true) {
    client.quit();
    return { cmd_result: sortedSet.toString(sortedSet.ALREADY_ADDED) };
  }
  const result = await client.SADD(`likes:${estateID}`, `users:${usrID}`);
  await client.quit();
  return { cmd_result: sortedSet.toString(result) };
};

module.exports = {
  getLikes,
  addLikes,
};
