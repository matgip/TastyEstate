// Reference: https://www.npmjs.com/package/redis

const client = require("../../../db-client/redis/client");
let addUser = async (profile) => {
  try {
    await client.connect();
    await client.HSET(profile.email, "nickname", profile.nickname);
    await client.disconnect();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addUser,
};
