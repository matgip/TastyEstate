// Reference: https://www.npmjs.com/package/redis

const client = require("../../../db-client/redis/client");

let getUser = async (userID) => {
  let result;
  await client.connect();

  try {
    result = await client.HGETALL("users:" + userID);
  } catch (err) {
    console.log(`HGET user command failed: ${err.message}`);
  }

  await client.quit();
  return result;
};

let addUser = async (profile) => {
  let HTTP_STATUS = 200;
  await client.connect();

  try {
    await client.HSET("users:" + profile.id, "email", profile.email);
    await client.HSET("users:" + profile.id, "nickname", profile.nickname);
  } catch (err) {
    console.log(`HSET user command failed: ${err.message}`);
    HTTP_STATUS = 500;
  }

  await client.quit();
  return HTTP_STATUS;
};

module.exports = {
  getUser,
  addUser,
};
