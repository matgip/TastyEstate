// Reference: https://www.npmjs.com/package/redis

const client = require("../../../db-client/redis/client");

const getLikes = async (estateID) => {
  let result;
  await client.connect();

  try {
    result = await client.SCARD("likes:" + estateID);
  } catch (err) {
    console.log(`SCARD estate command failed: ${err.message}`);
  }

  await client.quit();
  return { likes: result };
};

module.exports = {
  getLikes,
};
