const router = require('express').Router();
const auth = require('../middlewares/auth');
const validateUser = require('../middlewares/validators');
const { getUserId, updateUser } = require('../controllers/users');

router.get('/users/me', auth, getUserId);
router.patch('/users/me', auth, validateUser, updateUser);

module.exports = router;
