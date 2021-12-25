const router = require("express").Router();
const path = require("path");
const fsPromises = require("fs").promises;

function readFileCards(req, res) {
  const cardsPath = path.join(__dirname, "..", "data", "users.json");
  fsPromises
    .readFile(cardsPath, { encoding: "utf8" })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
router.get("/cards", readFileCards);

module.exports = router;
