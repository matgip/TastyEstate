// Reference: https://www.npmjs.com/package/redis
const client = require("../../../db-config/redis/client");

const isEmpty = (result) => {
  return result.email === undefined || result.nickname === undefined;
};

const getUser = async (usrID) => {
  if (!usrID) {
    throw new Error("user id should be provided");
  }
  await client.connect();
  const user = await client.HGETALL("users:" + usrID);
  await client.quit();
  return user;
};

const addUser = async (usr) => {
  if (!usr) {
    throw new Error("user is not valid");
  }
  if (!usr.id || !usr.email || !usr.nickname) {
    throw new Error("user object must has email and nickname");
  }
  await client.connect();
  client
    .multi()
    .HSET("users:" + usr.id, "email", usr.email)
    .HSET("users:" + usr.id, "nickname", usr.nickname)
    .exec();
  await client.quit();
};

module.exports = {
  isEmpty,
  getUser,
  addUser,
};
