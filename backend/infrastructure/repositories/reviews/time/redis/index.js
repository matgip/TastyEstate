// Reference: https://www.npmjs.com/package/redis
const { AbortError } = require("redis");
const client = require("../../../../config/redis/client");
const zset = require("./zset");
const { InvalidInputError, CommandError, ConnectionError } = require("../../../../../utils/errors");

const addUser = async (estateId, data) => {
  if (!estateId || !data) {
    throw new InvalidInputError("estate id and data should be provided", true);
  }
  if (!data.user) {
    throw new InvalidInputError("user id must be provided", true);
  }

  try {
    await client.connect();
    const result = await client.ZADD(`reviews:${estateId}:time`, [
      {
        score: Math.floor(new Date().getTime() / 1000),
        value: `user:${data.user}`,
      },
    ]);
    await client.quit();
    return { cmd_result: zset.toString(result) };
  } catch (err) {
    if (err instanceof AbortError) {
      throw new CommandError();
    } else {
      throw new ConnectionError("Failed to connect database", true);
    }
  }
};

module.exports = {
  addUser,
};
