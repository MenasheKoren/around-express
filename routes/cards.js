const router = require("express").Router();
const cards = require("../data/cards.json");

router.use(function (req, res, next) {
  console.log("Try not. Do or do not. There is no try.");

  next();
});

router.get("/", (req, res) => {
  res.status(200).send(cards);
});

module.exports = router;
