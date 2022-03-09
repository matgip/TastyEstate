// Reference: https://www.npmjs.com/package/redis
const { AbortError } = require("redis");
const client = require("../../../db-config/redis/client");
const { InvalidInputError, CommandError, ConnectionError } = require("../../../errors");

const isEmpty = (result) => {
  return result.place_name === undefined || result.phone_number === undefined;
};

const getEstate = async (id) => {
  if (!id || isNaN(id)) {
    throw new InvalidInputError("estate id not provided", true);
  }

  try {
    await client.connect();
    const estate = await client.HGETALL("estates:" + id);
    await client.quit();
    return estate;
  } catch (err) {
    if (err instanceof AbortError) {
      throw new CommandError();
    } else {
      throw new ConnectionError();
    }
  }
};

const addEstate = async (e) => {
  if (!e) {
    throw new InvalidInputError("estate is not provided", true);
  }
  if (!e.id || isNaN(e.id) || !e.place_name || !e.phone_number) {
    throw new InvalidInputError("invalid estate object", true);
  }

  try {
    await client.connect();
    client
      .multi()
      .HSET("estates:" + e.id, "place_name", e.place_name)
      .HSET("estates:" + e.id, "phone_number", e.phone_number)
      .exec();
    await client.quit();
  } catch (err) {
    if (err instanceof AbortError) {
      throw new CommandError();
    } else {
      throw new ConnectionError();
    }
  }
};

module.exports = {
  isEmpty,
  getEstate,
  addEstate,
};
