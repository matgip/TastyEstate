// Reference: https://www.npmjs.com/package/redis
const client = require("../../../db-config/redis/client");
const { InvalidInputError } = require("../../../error-handler/errors");
const sortedSet = require("./result");

const getLikes = async (estateID) => {
  if (!estateID) {
    throw new InvalidInputError("estate id not provided", true);
  }
  await client.connect();
  const likesCnt = await client.SCARD("likes:" + estateID);
  await client.quit();
  return { likes: likesCnt };
};

const addLikes = async (estateID, usrID) => {
  if (!estateID || !usrID) {
    throw new InvalidInputError("estate id and user id should be provided", true);
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
