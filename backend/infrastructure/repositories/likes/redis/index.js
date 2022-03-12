// Reference: https://www.npmjs.com/package/redis
const { AbortError } = require("redis");
const client = require("../../../config/redis/client");
const { InvalidInputError, CommandError, ConnectionError } = require("../../../../utils/errors");
const sortedSet = require("./sortedSet");

const getLikes = async (estateId) => {
  if (!estateId || isNaN(estateId)) {
    throw new InvalidInputError("Invalid estate id", true);
  }

  try {
    await client.connect();
    const likesCnt = await client.SCARD("likes:" + estateId);
    await client.quit();
    return { likes: likesCnt };
  } catch (err) {
    if (err instanceof AbortError) {
      throw new CommandError();
    } else {
      throw new ConnectionError("Failed to connect database", true);
    }
  }
};

const addLikes = async (estateId, usrId) => {
  if (!estateId || !usrId || isNaN(estateId) || isNaN(usrId)) {
    throw new InvalidInputError("Invalid estate id or user id", true);
  }

  try {
    await client.connect();
    const isExist = await client.SISMEMBER(`likes:${estateId}`, `users:${usrId}`);
    if (isExist === true) {
      client.quit();
      return { cmd_result: sortedSet.toString(sortedSet.ALREADY_ADDED) };
    }
    const result = await client.SADD(`likes:${estateId}`, `users:${usrId}`);
    await client.quit();
    return { cmd_result: sortedSet.toString(result) };
  } catch (err) {
    if (err instanceof AbortError) {
      throw new CommandError();
    } else {
      throw new ConnectionError("Failed to connect database", true);
    }
  }
};

module.exports = {
  getLikes,
  addLikes,
};
