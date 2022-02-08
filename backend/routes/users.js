const express = require("express");
const router = express.Router();

let usersDb = require("../data-access/users");
let users = (module.exports = {});

users.getUser = (req, res) => {
  usersDb.getUser(req.params.id).then((data) => res.send(data));
};
users.addUser = (req, res) => {
  usersDb.addUser(req.body).then((data) => res.sendStatus(data));
};

router.get("/:id", users.getUser);

router.post("/", users.addUser);

module.exports = router;
