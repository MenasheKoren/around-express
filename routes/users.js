const router = require("express").Router();
const users = require("../data/users.json");

const doesUserExist = (req, res, next) => {
  if (!users.find((user) => user._id === req.params.id)) {
    res.send(`This user doesn't exist`);
    return;
  }
  next();
};

const sendUser = (req, res) => {
  for (const user in users) {
    res.send(users.filter((user) => user._id === req.params.id));
  }
};

router.get("/", (req, res) => {
  res.status(404).send("Requested resource not found");
});

router.get("/:id", doesUserExist, sendUser);

module.exports = router;
