const Card = require('../models/card');
const {
  notFoundErrorHandler,
  getCardsErrorHandlerSelector,
  getCardByIdErrorHandlerSelector,
} = require('../errors/not-found-error');

module.exports.getCards = (req, res) => {
  Card.find()
    .orFail(() => {
      notFoundErrorHandler(getCardsErrorHandlerSelector);
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(getCards)....${err}`,
        });
      } else {
        res.status(500).send({
          message: '(getCards)....: An error has occurred on the server',
        });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { owner, name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    // todo: Find an if statement for catch status codes 400 & 500
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: `(createCard).... ${err}` });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      notFoundErrorHandler(getCardByIdErrorHandlerSelector);
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      console.log(err);
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(deleteCardById)....${err}`,
        });
      } else {
        res.status(500).send({
          message: '(deleteCardById)....: An error has occurred on the server',
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
    notFoundErrorHandler(getCardByIdErrorHandlerSelector);
  })
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    console.log(err);
    if (err.statusCode === 404) {
      res.status(err.statusCode).send({
        message: `(likeCard)....${err}`,
      });
    } else {
      res.status(500).send({
        message: '(likeCard)....: An error has occurred on the server',
      });
    }
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    notFoundErrorHandler(getCardByIdErrorHandlerSelector);
  })
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    console.log(err);
    if (err.statusCode === 404) {
      res.status(err.statusCode).send({
        message: `(dislikeCard)....${err}`,
      });
    } else {
      res.status(500).send({
        message: '(dislikeCard)....: An error has occurred on the server',
      });
    }
  });
