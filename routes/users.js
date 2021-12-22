const router = require("express").Router();
const users = require("../data/users.json");

const doesUserExist = (req, res, next) => {
  if (!users.find(user => user._id === req.params.id)) {
    res.send(`This user doesn't exist`);
    return;
  }
  next();
};

const sendUser = (req, res) => {
  res.send(users);
};

router.get("/", (req, res) => {
  res.status(404).send('Requested resource not found');
});

router.get("/:id", doesUserExist, sendUser);

module.exports = router;
