const { StatusCodes } = require("http-status-codes");

const DAL = require("../../infrastructure/repositories/reviews/review");
const { getErrorCode, getReason } = require("../../utils/http");

const getReview = async (req, res) => {
  try {
    const review = await DAL.getReview(req.params.estateId, req.params.userId);
    if (DAL.isEmpty(review) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(review);
  } catch (err) {
    const errCode = getErrorCode(err);
    res.status(errCode).send({
      error: getReason(errCode),
    });
  }
};

const addReview = async (req, res) => {
  try {
    const result = await DAL.addReview(req.params.estateId, req.body);
    res.json(result);
  } catch (err) {
    const errCode = getErrorCode(err);
    res.status(errCode).send({
      error: getReason(errCode),
    });
  }
};

module.exports = {
  getReview,
  addReview,
};
