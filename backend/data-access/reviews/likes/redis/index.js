// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../db-client/redis/client");

const ZADD_FAILED = 0;
const ZADD_SUCCESS = 1;

const int2Str = (cmdInt) => {
  return cmdInt === ZADD_SUCCESS ? "success" : "failed";
};

const addUser = async (estateID, data) => {
  await client.connect();
  const result = await client.ZADD(`reviews:${estateID}:likes`, [
    {
      score: 0,
      value: `user:${data.user}`,
    },
  ]);
  await client.quit();
  return { cmd_result: int2Str(result) };
};

module.exports = {
  addUser,
};
