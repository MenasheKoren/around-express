const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

router.get('/users/:_id', (req, res) => getUserById(req, res));
router.get('/users', (req, res) => getUsers(req, res));
router.post('/', createUser);

module.exports = router;
