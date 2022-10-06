const router = require('express').Router();
const { validateUser } = require('../middlewares/validators');
const { getUserId, updateUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users/me', auth, getUserId);
router.patch('/users/me', auth, validateUser, updateUser);

module.exports = router;
