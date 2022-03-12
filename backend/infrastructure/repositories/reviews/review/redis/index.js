// Reference: https://www.npmjs.com/package/redis
const client = require("../../../../config/redis/client");

const isEmpty = (result) => {
  return !result.rating || !result.kindness || !result.price || !result.contract || !result.text;
};

const getReview = async (estateId, userId) => {
  await client.connect();
  const review = await client.HGETALL(`reviews:${estateId}:users:${userId}`);
  await client.quit();
  return review;
};

const addReview = async (estateId, r) => {
  await client.connect();
  client
    .multi()
    .HSET(`reviews:${estateId}:users:${r.userId}`, "rating", r.rating)
    .HSET(`reviews:${estateId}:users:${r.userId}`, "kindness", r.kindness)
    .HSET(`reviews:${estateId}:users:${r.userId}`, "price", r.price)
    .HSET(`reviews:${estateId}:users:${r.userId}`, "contract", r.contract)
    .HSET(`reviews:${estateId}:users:${r.userId}`, "text", r.text)
    .exec();
  await client.quit();
};

module.exports = {
  isEmpty,
  getReview,
  addReview,
};
