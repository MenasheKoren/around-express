const router = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');

router.get('/users/:userId', (req, res) => getUserById(req, res));
router.get('/users', (req, res) => getUsers(req.userId, res));
module.exports = router;
