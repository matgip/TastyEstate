// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../db-config/redis/client");
const zset = require("./cmd-return");
const { InvalidInputError } = require("../../../../error-handler/errors");

const addUser = async (estateID, data) => {
  if (!estateID || !data) {
    throw new InvalidInputError("estate id and data should be provided", true);
  }
  if (!data.user) {
    throw new InvalidInputError("user id must be provided", true);
  }
  await client.connect();
  const result = await client.ZADD(`reviews:${estateID}:time`, [
    {
      score: Math.floor(new Date().getTime() / 1000),
      value: `user:${data.user}`,
    },
  ]);
  await client.quit();
  return { cmd_result: zset.toString(result) };
};

module.exports = {
  addUser,
};
