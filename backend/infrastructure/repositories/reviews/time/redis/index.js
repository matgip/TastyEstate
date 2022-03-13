// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");

const addUser = async (estateId, data) => {
  await client.connect();
  await client.ZADD(`reviews:${estateId}:time`, [
    {
      score: Math.floor(new Date().getTime() / 1000),
      value: `user:${data.user}`,
    },
  ]);
  await client.ZCARD(`reviews:${estateId}:time`);
  await client.quit();
};

module.exports = {
  addUser,
};
