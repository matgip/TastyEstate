// Reference: https://www.npmjs.com/package/redis
const client = require("../../../db-config/redis/client");
const { InvalidInputError } = require("../../../errors");

const isEmpty = (result) => {
  return result.email === undefined || result.nickname === undefined;
};

const getUser = async (usrID) => {
  if (!usrID) {
    throw new InvalidInputError("user id should be provided", true);
  }
  await client.connect();
  const user = await client.HGETALL("users:" + usrID);
  await client.quit();
  return user;
};

const addUser = async (usr) => {
  if (!usr) {
    throw new InvalidInputError("user is not valid", true);
  }
  if (!usr.id || !usr.email || !usr.nickname) {
    throw new InvalidInputError("user object must has email and nickname", true);
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
