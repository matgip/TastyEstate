// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");
const zset = require("./zset");

const addUser = async (estateId, data) => {
  await client.connect();
  const result = await client.ZADD(`reviews:${estateId}:time`, [
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
