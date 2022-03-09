const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");

const DAL = require("../data-access/likes");
const { InvalidInputError, ConnectionError } = require("../errors");

const getLikes = async (req, res) => {
  try {
    const likesCnt = await DAL.getLikes(req.params.id);
    res.json(likesCnt);
  } catch (err) {
    if (err instanceof InvalidInputError) {
      res.status(httpStatus.StatusCodes.BAD_REQUEST).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.BAD_REQUEST),
      });
    } else if (err instanceof ConnectionError) {
      res.status(httpStatus.StatusCodes.SERVICE_UNAVAILABLE).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.SERVICE_UNAVAILABLE),
      });
    } else {
      res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR),
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
    } else if (err instanceof ConnectionError) {
      res.status(httpStatus.StatusCodes.SERVICE_UNAVAILABLE).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.SERVICE_UNAVAILABLE),
      });
    } else {
      res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  }
};

router.get("/:id", getLikes);
router.put("/:id", addLikes);

module.exports = router;
