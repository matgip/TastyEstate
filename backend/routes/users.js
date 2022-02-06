const express = require("express");
const router = express.Router();

let usersDb = require("../data-access/users");
let users = (module.exports = {});

users.getUser = (req, res, next) => {
  res.send("respond with a resource");
};
users.addUser = (req, res) => {
  usersDb
    .addUser(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

router.get("/", users.getUser);

router.post("/", users.addUser);

module.exports = router;
