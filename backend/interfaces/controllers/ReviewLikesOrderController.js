const { StatusCodes } = require("http-status-codes");

const ReviewLikeOrderRepository = require("../../infrastructure/repositories/reviews/likes");

const add = async (req, res) => {
  try {
    const result = await ReviewLikeOrderRepository.persist(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  add,
};
