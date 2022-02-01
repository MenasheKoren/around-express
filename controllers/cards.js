const Card = require('../models/card');
const {
  documentNotFoundErrorHandler,
  getCardsErrorHandlerSelector,
  getCardByIdErrorHandlerSelector,
} = require('../errors/not-found-error');
const {
  cardDataErrorHandlerSelector,
  deleteActionFailSelector,
  likeActionFailSelector,
  dislikeActionFailSelector,
} = require('../errors/invalid-data-passed-error');

const {
  catchFindErrorHandler,
  catchCreateErrorHandler,
  catchFindByIdAndUpdateOrDeleteErrorHandler,
} = require('../errors/catch-errors');

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
      catchFindErrorHandler(err, res);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      catchCreateErrorHandler(err, res, cardDataErrorHandlerSelector);
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      documentNotFoundErrorHandler(getCardByIdErrorHandlerSelector);
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      catchFindByIdAndUpdateOrDeleteErrorHandler(
        err,
        res,
        cardDataErrorHandlerSelector,
        deleteActionFailSelector,
      );
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
    catchFindByIdAndUpdateOrDeleteErrorHandler(
      err,
      res,
      cardDataErrorHandlerSelector,
      likeActionFailSelector,
    );
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
    catchFindByIdAndUpdateOrDeleteErrorHandler(
      err,
      res,
      cardDataErrorHandlerSelector,
      dislikeActionFailSelector,
    );
  });
