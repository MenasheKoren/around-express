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
    .catch((err) => res.status(500).send({ message: `Error: ${err} when finding user Id` }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name: 'Mr. Test', about: 'Testbot', avatar: 'https://media1.giphy.com/media/gw3IWyGkC0rsazTi/200.gif' })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error: ${err} when creating user` }));
}

module.exports = { getUsers, getUserById, createUser };
