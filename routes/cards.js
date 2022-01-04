const router = require('express').Router();
const { getCards, createCard } = require('../controllers/cards');

router.get('/cards', (res, req) => getCards(res, req));

router.post('/cards', createCard);

module.exports = router;
