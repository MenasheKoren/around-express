const router = require("express").Router();
const { users } = require("../data/users.json");

router.get("/users", (req, res) => {
  res.send(users);
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;

  if (!users[id]) {
    res.send({ error: `This user doesn't exist` });
    return;
  }

  res.send(users[id]);
});

module.exports = router;
