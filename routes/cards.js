const router = require("express").Router();
// const cards = require("../data/cards.json");
const { readFileCards } = require("../middleware");


router.get("/cards", (req, res) => {
  res.status(200).send('cards');
});
router.use(readFileCards);
module.exports = router;
