const User = require('../models/user');
const onFailNotFoundError = require('../errors/not-found-error');

function getUsers(req, res) {
  User.find()
    .orFail(onFailNotFoundError('users'))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .orFail(onFailNotFoundError('user with that Id'))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error (getUserById): ${err}` }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error (createUser): ${err}` }));
}

module.exports = { getUsers, getUserById, createUser };
