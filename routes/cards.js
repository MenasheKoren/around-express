const router = require('express').Router();
const { getCards, createCard, deleteCardById } = require('../controllers/cards');

router.get('/cards', (res, req) => getCards(res, req));

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCardById);

// todo PUT /cards/:cardId/likes — like a card
// todo DELETE /cards/:cardId/likes — unlike a card
module.exports = router;
