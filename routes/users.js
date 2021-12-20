const router = require('express').Router();
const { users } = require('../data/users.json');

router.get('/users/:id', (req, res) => {
  if (!users[req.params.id]) {
    const error = { error: `This user doesn't exist` }
    res.send({error});

    return;
  }
  res.send(users[req.params.id]);
});

module.exports = router;
