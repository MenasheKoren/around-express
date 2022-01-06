const User = require('../models/user');
const {
  notFoundErrorHandler,
  getUsersErrorHandlerSelector,
  getUserByIdErrorHandlerSelector,
} = require('../errors/not-found-error');
const {
  invalidDataPassedErrorHandler,
  userDataErrorHandlerSelector,
  createActionFailSelector,
} = require('../errors/invalid-data-passed-error');

module.exports.getUsers = (req, res) => {
  User.find()
    .orFail(() => {
      notFoundErrorHandler(getUsersErrorHandlerSelector);
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(getUsers)....${err}`,
        });
      } else {
        res.status(500).send({
          message: '(getUsers)....: An error has occurred on the server',
        });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      notFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(err.statusCode).send({
          message: `(getUserById)....${err}`,
        });
      } else {
        res.status(500).send({
          message: '(getUserById)....: An error has occurred on the server',
        });
      }add invalid-data-passed-error.js
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `(createUser).... ${err}`,
        });
      } else {
        res.status(500).send({
          message: '(createUser)....: An error has occurred on the server',
        });
      }
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(() => {
      notFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.log(err);
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(updateUserProfile)....${err}`,
        });
      } else {
        res.status(500).send({
          message:
            '(updateUserProfile)....: An error has occurred on the server',
        });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(() => {
      notFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.log(err);
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(updateUserAvatar)....${err}`,
        });
      } else {
        res.status(500).send({
          message:
            '(updateUserAvatar)....: An error has occurred on the server',
        });
      }
    });
};
