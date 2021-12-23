const router = require("express").Router();
const users = require("../data/users.json");
const fsPromises = require("fs").promises;
const path = require("path");

const filepath = path.join(__dirname, "..", "data", "users.json");
fsPromises
  .readFile(filepath, { encoding: "utf8" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

const doesUserExist = (req, res, next) => {
  if (!users.find((user) => user._id === req.params._id)) {
    res.status(404).send(`This user doesn't exist`);
    return;
  }
  next();
};

const sendUser = (req, res) => {
  res.send(users.filter((user) => user._id === req.params._id));
};

router.get("/users/:_id", doesUserExist, sendUser);

router.get("/users", (req, res) => {
  res.status(404).send("Requested resource not found");
});

router.get("/", (req, res) => {
  res.status(404).send("Requested resource not found");
});

module.exports = router;
