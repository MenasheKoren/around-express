const User = require('../models/user');
const {
  onFailNotFoundErrorHandler,
  getUsersErrorHandlerSelector,
  getUserByIdErrorHandlerSelector,
} = require('../errors/not-found-error');

function getUsers(req, res) {
  User.find()
    .orFail(() => {
      onFailNotFoundErrorHandler(getUsersErrorHandlerSelector);
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(err.statusCode).send({ message: `(getUsers)...${err}` });
    });
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .orFail(() => {
      onFailNotFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.statusCode).send({
      message: `(getUserById)...${err}`,
    }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `(createUser): ${err}` }));
}

module.exports = { getUsers, getUserById, createUser };
