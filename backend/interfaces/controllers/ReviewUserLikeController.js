const { StatusCodes } = require("http-status-codes");

const ReviewUserLikeRepository = require("../../infrastructure/repositories/reviews/userLikesCount");

const add = async (req, res) => {
  try {
    const result = await ReviewUserLikeRepository.persist(req.params.estateId, req.params.userId, req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  add,
};
