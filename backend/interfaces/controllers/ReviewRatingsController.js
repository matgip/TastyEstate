const { StatusCodes } = require("http-status-codes");

const ReviewRatingRepository = require("../../infrastructure/repositories/reviews/ratings");

const add = async (req, res) => {
  try {
    await ReviewRatingRepository.persist(req.params.id, req.body);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  add,
};
