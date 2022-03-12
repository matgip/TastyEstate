// Reference: https://www.npmjs.com/package/redis
const { AbortError } = require("redis");
const client = require("../../../../config/redis/client");
const { InvalidInputError, CommandError, ConnectionError } = require("../../../../../utils/errors");

const isEmpty = (result) => {
  return !result.rating || !result.kindness || !result.price || !result.contract || !result.text;
};

const getReview = async (estateId, userId) => {
  if (!estateId || !userId || isNaN(estateId) || isNaN(userId)) {
    throw new InvalidInputError("estate id or user id is not provided", true);
  }

  try {
    await client.connect();
    const review = await client.HGETALL(`reviews:${estateId}:users:${userId}`);
    await client.quit();
    return review;
  } catch (err) {
    if (err instanceof AbortError) {
      throw new CommandError();
    } else {
      throw new ConnectionError("Failed to connect database", true);
    }
  }
};

const addReview = async (estateId, r) => {
  if (!estateId || !r || isNaN(estateId)) {
    throw new InvalidInputError("estate id or review is not provided", true);
  }
  if (
    !r.userId ||
    !r.rating ||
    !r.kindness ||
    !r.price ||
    !r.contract ||
    !r.text ||
    isNaN(r.userId) ||
    isNaN(r.rating)
  ) {
    throw new InvalidInputError("invalid review object", true);
  }

  try {
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
  } catch (err) {
    if (err instanceof AbortError) {
      throw new CommandError();
    } else {
      throw new ConnectionError("Failed to connect database", true);
    }
  }
};

module.exports = {
  isEmpty,
  getReview,
  addReview,
};
