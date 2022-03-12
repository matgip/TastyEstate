// Reference: https://www.npmjs.com/package/redis
const client = require("../../../config/redis/client");

const isEmpty = (result) => {
  return result.email === undefined || result.nickname === undefined;
};

const getUser = async (usrID) => {
  await client.connect();
  const user = await client.HGETALL("users:" + usrID);
  await client.quit();
  return user;
};

const addUser = async (usr) => {
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
