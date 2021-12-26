const router = require('express').Router();

const {
  readFileData,
  cardsPath
} = require('../helpers/index')

router.use(cardsPath, readFileData)

router.get('/cards', readFileData);

module.exports = router;
