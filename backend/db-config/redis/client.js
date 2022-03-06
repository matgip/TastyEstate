const env = require("../../env");
const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: env.redis.HOST || "127.0.0.1",
    port: env.redis.PORT || 6379,
  },
});

module.exports = client;
