const router = require('express').Router();
const { readFileData, usersPath, readFileUsers } = require('../helpers/index');

router.get('/users/:_id', (res, req) => readFileUsers(usersPath, res, req));

router.get('/users', (res, req) => readFileData(usersPath, res, req));

module.exports = router;
