const express = require("express");
const router = express.Router();
const httpStatus = require("../http-status");

let usersDb = require("../data-access/users");
let users = (module.exports = {});

users.getUser = async (req, res) => {
  try {
    const result = await usersDb.getUser(req.params.id);
    if (result.data == null) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(httpStatus.INTERNAL_ERR);
  }
};
users.addUser = async (req, res) => {
  try {
    const data = await usersDb.addUser(req.body);
    res.sendStatus(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(httpStatus.INTERNAL_ERR);
  }
};

router.get("/:id", users.getUser);
router.post("/", users.addUser);

module.exports = router;
