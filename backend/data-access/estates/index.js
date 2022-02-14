let { isEmptyReply, getEstate, addEstate } = require("./redis/index");

let estatesDb = {
  isEmptyReply,
  getEstate,
  addEstate,
};

module.exports = estatesDb;
