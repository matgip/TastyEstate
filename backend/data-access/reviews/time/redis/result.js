class ZSet {
  ZADD_FAILED = 0;
  ZADD_SUCCESS = 1;

  toString(result) {
    return result === this.ZADD_SUCCESS ? "success" : "failed";
  }
}

const zset = new ZSet();
module.exports = zset;
