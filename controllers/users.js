const { Error } = require('mongoose');
const User = require('../models/user');
const {
  documentNotFoundErrorHandler,
  getUsersErrorHandlerSelector,
  getUserByIdErrorHandlerSelector,
} = require('../errors/not-found-error');
const {
  invalidDataPassedErrorHandler,
  userDataErrorHandlerSelector,
  createActionFailSelector,
  updateActionFailSelector,
} = require('../errors/invalid-data-passed-error');

module.exports.getUsers = (req, res) => {
  User.find()
    .lean()
    .orFail(() => {
      documentNotFoundErrorHandler(getUsersErrorHandlerSelector);
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(err.statusCode).send({
          message: `${err}`,
        });
      } else {
        res.status(500).send({
          message: 'An error has occurred on the server',
        });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .lean()
    .orFail(() => documentNotFoundErrorHandler(getUserByIdErrorHandlerSelector))
    .then((user) => res.status(200).send({ data: user }))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(err.statusCode).send({
          message: `${err}`,
        });
      } else {
        res.status(500).send({
          message: 'An error has occurred on the server',
        });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err instanceof Error) {
        invalidDataPassedErrorHandler(
          userDataErrorHandlerSelector,
          createActionFailSelector,
          res,
          err,
        );
      } else {
        res.status(500).send({
          message: 'An error has occurred on the server',
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
      documentNotFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(err.statusCode).send({
          message: `${err}`,
        });
      } else if (err instanceof Error) {
        invalidDataPassedErrorHandler(
          userDataErrorHandlerSelector,
          updateActionFailSelector,
          res,
          err,
        );
      } else {
        res.status(500).send({
          message: 'An error has occurred on the server',
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
      documentNotFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(err.statusCode).send({
          message: `${err}`,
        });
      } else if (err instanceof Error) {
        invalidDataPassedErrorHandler(
          userDataErrorHandlerSelector,
          updateActionFailSelector,
          res,
          err,
        );
      } else {
        res.status(500).send({
          message: 'An error has occurred on the server',
        });
      }
    });
};
