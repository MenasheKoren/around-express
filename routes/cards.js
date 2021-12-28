const router = require('express').Router();

const { readFileData, cardsPath } = require('../helpers/index');

router.get('/cards', (res, req) => readFileData(cardsPath, res, req));

module.exports = router;
