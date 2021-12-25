const router = require("express").Router();
const path = require("path");
const fsPromises = require("fs").promises;

function readFileUsers(req, res) {
  const usersPath = path.join(__dirname, "..", "data", "users.json");
  fsPromises
    .readFile(usersPath, { encoding: "utf8" })
    .then((data) => {
      if (!data.match(req.params._id)) {
        res.status(404).send(`This user doesn't exist`);
      } else {
        res.send(
          JSON.parse(data).filter((user) => user._id === req.params._id)
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

router.get("/users/:_id", readFileUsers);
router.get("/users", (req, res) => {
  res.status(404).send("Requested resource not found");
});

router.get("/", (req, res) => {
  res.status(404).send("Requested resource not found");
});

module.exports = router;
