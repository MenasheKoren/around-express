const User = require('../models/user');

function getUsers(req, res) {
  User.find()
    .orFail()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
}

function getUserById(req, res) {
  User.findById((req.userId = '61d3372ee6fd45d3fec1d71b'))
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error ${err} in getUser` }));
}
// TODO POST /users — creates a new user

module.exports = { getUsers, getUserById };
