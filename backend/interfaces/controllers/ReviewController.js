const { StatusCodes } = require("http-status-codes");

const DAL = require("../../infrastructure/repositories/reviews/review");

const getReview = async (req, res) => {
  try {
    const review = await DAL.getReview(req.params.estateId, req.params.userId);
    if (DAL.isEmpty(review) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(review);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const addReview = async (req, res) => {
  try {
    const result = await DAL.addReview(req.params.estateId, req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  getReview,
  addReview,
};
