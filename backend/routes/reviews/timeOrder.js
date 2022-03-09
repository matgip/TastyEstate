const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");

const DAL = require("../../data-access/reviews/time");
const { InvalidInputError, ConnectionError } = require("../../errors");

const addUser = async (req, res) => {
  try {
    const result = await DAL.addUser(req.params.id, req.body);
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

router.put("/:id/time", addUser);

module.exports = router;
