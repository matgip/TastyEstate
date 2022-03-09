const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");

const DAL = require("../data-access/users");
const { InvalidInputError } = require("../errors");

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
    } else {
      res.status(httpStatus.StatusCodes.SERVICE_UNAVAILABLE).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.SERVICE_UNAVAILABLE),
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
    } else {
      res.status(httpStatus.StatusCodes.SERVICE_UNAVAILABLE).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.SERVICE_UNAVAILABLE),
      });
    }
  }
};

router.get("/:id", getUser);
router.post("/", addUser);

module.exports = router;
