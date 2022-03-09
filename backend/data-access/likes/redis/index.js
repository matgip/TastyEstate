// Reference: https://www.npmjs.com/package/redis
const { AbortError } = require("redis");
const client = require("../../../db-config/redis/client");
const { InvalidInputError, CommandError, ConnectionError } = require("../../../errors");
const sortedSet = require("./result");

const getLikes = async (estateID) => {
  if (!estateID || isNaN(estateID)) {
    throw new InvalidInputError("Invalid estate id", true);
  }

  try {
    await client.connect();
    const likesCnt = await client.SCARD("likes:" + estateID);
    await client.quit();
    return { likes: likesCnt };
  } catch (err) {
    if (err instanceof AbortError) {
      throw new CommandError();
    } else {
      throw new ConnectionError();
    }
  }
};

const addLikes = async (estateID, usrID) => {
  if (!estateID || !usrID || isNaN(estateID) || isNaN(usrID)) {
    throw new InvalidInputError("Invalid estate id or user id", true);
  }

  try {
    await client.connect();
    const isExist = await client.SISMEMBER(`likes:${estateID}`, `users:${usrID}`);
    if (isExist === true) {
      client.quit();
      return { cmd_result: sortedSet.toString(sortedSet.ALREADY_ADDED) };
    }
    const result = await client.SADD(`likes:${estateID}`, `users:${usrID}`);
    await client.quit();
    return { cmd_result: sortedSet.toString(result) };
  } catch (err) {
    if (err instanceof AbortError) {
      throw new CommandError();
    } else {
      throw new ConnectionError();
    }
  }
};

module.exports = {
  getLikes,
  addLikes,
};
