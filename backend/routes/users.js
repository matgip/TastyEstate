const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");

const DAL = require("../data-access/users");
const { InvalidInputError, ConnectionError } = require("../errors");

const getUser = async (req, res) => {
  try {
    const user = await DAL.getUser(req.params.id);
    if (DAL.isEmpty(user) === true) {
      res.sendStatus(httpStatus.StatusCodes.NO_CONTENT);
      return;
    }
    res.json(user);
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

const addUser = async (req, res) => {
  try {
    await DAL.addUser(req.body);
    res.sendStatus(StatusCodes.OK);
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

router.get("/:id", getUser);
router.post("/", addUser);

module.exports = router;
