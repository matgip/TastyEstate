// Reference: https://www.npmjs.com/package/redis
const client = require("../../../db-config/redis/client");

const getUser = async (usrID) => {
  await client.connect();
  const user = await client.HGETALL("users:" + usrID);
  await client.quit();
  return user;
};

const addUser = async (usr) => {
  await client.connect();
  client.HSET("users:" + usr.id, "email", usr.email);
  client.HSET("users:" + usr.id, "nickname", usr.nickname);
  await client.quit();
};

module.exports = {
  getUser,
  addUser,
};
