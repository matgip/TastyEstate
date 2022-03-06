// Reference: https://www.npmjs.com/package/redis
const client = require("../../../db-client/redis/client");

const getUser = async (userID) => {
  await client.connect();
  const user = await client.HGETALL("users:" + userID);
  await client.quit();
  return user;
};

const addUser = async (profile) => {
  await client.connect();
  client.HSET("users:" + profile.id, "email", profile.email);
  client.HSET("users:" + profile.id, "nickname", profile.nickname);
  await client.quit();
};

module.exports = {
  getUser,
  addUser,
};
