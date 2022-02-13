const express = require("express");
const router = express.Router();

let usersDb = require("../data-access/users");
let users = (module.exports = {});

users.getUser = async (req, res) => {
  const data = await usersDb.getUser(req.params.id);
  res.send(data);
};
users.addUser = async (req, res) => {
  const data = await usersDb.addUser(req.body);
  res.sendStatus(data);
};

router.get("/:id", users.getUser);

router.post("/", users.addUser);

module.exports = router;
