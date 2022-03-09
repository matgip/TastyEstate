const DAL = require("../../infrastructure/repositories/reviews/time");
const { getStatus, getReasonPhrase } = require("../../utils/http");

const addUser = async (req, res) => {
  try {
    const result = await DAL.addUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    const errCode = getStatus(err);
    res.status(errCode).send({
      error: getReasonPhrase(errCode),
    });
  }
};

module.exports = {
  addUser,
};
