// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../db-config/redis/client");
const zset = require("./cmd-return");
const { InvalidInputError } = require("../../../../errors");

const addUser = async (estateID, data) => {
  if (!estateID || !data) {
    throw new InvalidInputError("estate id and data object should be provided", true);
  }
  if (!data.user) {
    throw new InvalidInputError("user id should be provided", true);
  }
  await client.connect();
  const result = await client.ZADD(`reviews:${estateID}:likes`, [
    {
      score: 0,
      value: `user:${data.user}`,
    },
  ]);
  await client.quit();
  return { cmd_result: zset.toString(result) };
};

module.exports = {
  addUser,
};
