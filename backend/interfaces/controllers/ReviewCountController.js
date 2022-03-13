const { StatusCodes } = require("http-status-codes");

const ReviewCountRepository = require("../../infrastructure/repositories/reviews/count");

const get = async (req, res) => {
  try {
    const totUserCnt = await ReviewCountRepository.get(req.params.id);
    res.json(totUserCnt);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  get,
};
