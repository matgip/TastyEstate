const { StatusCodes } = require("http-status-codes");

const LikeRepository = require("../../infrastructure/repositories/likes");

// const get = async (req, res) => {
//   try {
//     const likesCnt = await LikeRepository.get(req.params.id);
//     res.json(likesCnt);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
//   }
// };

const add = async (req, res) => {
  try {
    const result = await LikeRepository.persist(req.params.id, req.body.user_id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  // get,
  add,
};
