class SortedSet {
  ALREADY_ADDED = -1;
  SADD_SUCCESS = 1;

  toString(result) {
    if (result === this.ALREADY_ADDED) return "already-added";
    if (result === this.SADD_SUCCESS) return "success";
    return "failed";
  }
}

const sortedSet = new SortedSet();
module.exports = sortedSet;
