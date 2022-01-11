const User = require('../models/user');
const {
  documentNotFoundErrorHandler,
  getUsersErrorHandlerSelector,
  getUserByIdErrorHandlerSelector,
} = require('../errors/not-found-error');
const {
  catchFindErrorHandler,
  catchFindByIdErrorHandler,
  catchCreateErrorHandler,
  catchFindByIdAndUpdateOrDeleteErrorHandler,
} = require('../errors/catch-errors');
const {
  userDataErrorHandlerSelector,
  updateActionFailSelector,
  userProfileDataErrorHandlerSelector,
  userAvatarDataErrorHandlerSelector,
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
      catchFindErrorHandler(err, res);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .lean()
    .orFail(() => documentNotFoundErrorHandler(getUserByIdErrorHandlerSelector))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      catchFindByIdErrorHandler(err, res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      catchCreateErrorHandler(err, res, userDataErrorHandlerSelector);
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
      upsert: false,
    },
  )
    .orFail(() => {
      documentNotFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      catchFindByIdAndUpdateOrDeleteErrorHandler(
        err,
        res,
        userProfileDataErrorHandlerSelector,
        updateActionFailSelector,
      );
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
      upsert: false,
    },
  )
    .orFail(() => {
      documentNotFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      catchFindByIdAndUpdateOrDeleteErrorHandler(
        err,
        res,
        userAvatarDataErrorHandlerSelector,
        updateActionFailSelector,
      );
    });
};
