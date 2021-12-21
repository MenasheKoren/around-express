const router = require("express").Router();

const users = require("../data/users.json");
const doesUserExist = require("./middleware");



router.use(doesUserExist);
const sendUser = (req, res) => {
  res.send(users[req.params._id]);
};

router.get("/", (req, res) => {
  res.status(200).send(users);

});

router.get("/:_id", doesUserExist, sendUser);


module.exports = router;
