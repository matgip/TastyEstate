// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");

const addUser = async (estateId, data) => {
  await client.ZADD(`reviews:${estateId}:time`, [
    {
      score: Math.floor(new Date().getTime() / 1000),
      value: `user:${data.user}`,
    },
  ]);
};

module.exports = {
  addUser,
};
