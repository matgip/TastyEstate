const express = require("express");
const router = express.Router();

let usersDb = require("../data-access/users");
let users = (module.exports = {});

users.getUser = async (req, res) => {
  try {
    const result = await usersDb.getUser(req.params.id);
    if (result.data == null) {
      res.sendStatus(404);
      return;
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};
users.addUser = async (req, res) => {
  try {
    const data = await usersDb.addUser(req.body);
    res.sendStatus(data);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};

router.get("/:id", users.getUser);

router.post("/", users.addUser);

module.exports = router;
