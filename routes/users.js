const router = require("express").Router();
const users = require("../data/users.json");

const doesUserExist = (req, res, next) => {
  if (!users[req.params.id]) {
    res.send(`This user doesn't exist`);
    return;
  }

  next();
};

const sendUser = (req, res) => {
  res.send(users[req.params.id]);
};

router.get("/", (req, res) => {
  res.status(200).send(users);
});

router.get("/:id", doesUserExist, sendUser);

module.exports = router;
