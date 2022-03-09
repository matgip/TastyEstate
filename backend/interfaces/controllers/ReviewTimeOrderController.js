const DAL = require("../../infrastructure/repositories/reviews/time");
const { getErrorCode, getReason } = require("../../utils/http");

const addUser = async (req, res) => {
  try {
    const result = await DAL.addUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    const errCode = getErrorCode(err);
    res.status(errCode).send({
      error: getReason(errCode),
    });
  }
};

module.exports = {
  addUser,
};
