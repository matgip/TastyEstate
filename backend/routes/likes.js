const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");

const DAL = require("../data-access/likes");
const { InvalidInputError } = require("../error-handler/errors");

const getLikes = async (req, res) => {
  try {
    const likesCnt = await DAL.getLikes(req.params.id);
    res.json(likesCnt);
  } catch (err) {
    if (err instanceof InvalidInputError) {
      res.status(httpStatus.StatusCodes.BAD_REQUEST).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.BAD_REQUEST),
      });
    } else {
      res.status(httpStatus.StatusCodes.SERVICE_UNAVAILABLE).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.SERVICE_UNAVAILABLE),
      });
    }
  }
};

const addLikes = async (req, res) => {
  try {
    const result = await DAL.addLikes(req.params.id, req.body.user_id);
    res.json(result);
  } catch (err) {
    if (err instanceof InvalidInputError) {
      res.status(httpStatus.StatusCodes.BAD_REQUEST).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.BAD_REQUEST),
      });
    } else {
      res.status(httpStatus.StatusCodes.SERVICE_UNAVAILABLE).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.SERVICE_UNAVAILABLE),
      });
    }
  }
};

router.get("/:id", getLikes);
router.put("/:id", addLikes);

module.exports = router;
