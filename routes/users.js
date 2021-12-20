const router = require("express").Router();
const users = require("../data/users.json");

router.use(function (req, res, next) {
  console.log('Keep going');

  next();
});

router.get("/", (req, res) => {
  res.status(200).send(users);
});



module.exports = router;
