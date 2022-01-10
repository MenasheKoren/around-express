const { Error } = require('mongoose');
const Card = require('../models/card');
const {
  documentNotFoundErrorHandler,
  getCardsErrorHandlerSelector,
  getCardByIdErrorHandlerSelector,
} = require('../errors/not-found-error');
const {
  invalidDataPassedErrorHandler,
  createActionFailSelector,
  cardDataErrorHandlerSelector,
} = require('../errors/invalid-data-passed-error');

module.exports.getCards = (req, res) => {
  Card.find()
    .lean()
    .orFail(() => {
      documentNotFoundErrorHandler(getCardsErrorHandlerSelector);
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

module.exports.createCard = (req, res) => {
  const { owner, name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err instanceof Error) {
        invalidDataPassedErrorHandler(
          cardDataErrorHandlerSelector,
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

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      documentNotFoundErrorHandler(getCardByIdErrorHandlerSelector);
    })
    .then((card) => res.status(200).send({ data: card }))
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

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    documentNotFoundErrorHandler(getCardByIdErrorHandlerSelector);
  })
  .then((card) => res.status(200).send({ data: card }))
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

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    documentNotFoundErrorHandler(getCardByIdErrorHandlerSelector);
  })
  .then((card) => res.status(200).send({ data: card }))
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
