const User = require('../models/user');
const {
  onFailNotFoundErrorHandler,
  getUsersErrorHandlerSelector,
  getUserByIdErrorHandlerSelector,
} = require('../errors/not-found-error');

module.exports.getUsers = (req, res) => {
  User.find()
    .orFail(() => {
      onFailNotFoundErrorHandler(getUsersErrorHandlerSelector);
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
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
      onFailNotFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(getUserById)....${err}`,
        });
      } else {
        res.status(500).send({
          message: '(getUserById)....: An error has occurred on the server',
        });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    // todo: Find an if statement for catch status codes 400 & 500
    .catch((err) => res.status(400).send({
      message: `(createUser).... ${err}`,
    }));
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
      onFailNotFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(updateUserProfile)....${err}`,
        });
      } else {
        res.status(500).send({
          message: '(updateUserProfile)....: An error has occurred on the server',
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
      onFailNotFoundErrorHandler(getUserByIdErrorHandlerSelector);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(updateUserAvatar)....${err}`,
        });
      } else {
        res.status(500).send({
          message: '(updateUserAvatar)....: An error has occurred on the server',
        });
      }
    });
};
