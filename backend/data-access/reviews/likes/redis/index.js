// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../db-config/redis/client");
const zset = require("./result");

const addUser = async (estateID, data) => {
  if (!estateID || !data) {
    throw new Error("Invalid input");
  }
  if (!data.user) {
    throw new Error("user id must be provided");
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
