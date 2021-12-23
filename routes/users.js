const router = require("express").Router();
const { readFileUsers } = require("../middleware");

const doesUserExist = (req, res, next) => {
  router.use(readFileUsers);
  console.log(readFileUsers);
  if (!readFileUsers.find((user) => user._id === req.params._id)) {
    res.status(404).send(`This user doesn't exist`);
    return;
  }
  next();
};

const sendUser = (req, res) => {
  router.use(readFileUsers);
  res.send(readFileUsers.filter((user) => user._id === req.params._id));
};

router.get("/users/:_id", doesUserExist, sendUser);

router.get("/users", (req, res) => {
  res.status(404).send("Requested resource not found");
});

router.get("/", (req, res) => {
  res.status(404).send("Requested resource not found");
});

module.exports = router;
