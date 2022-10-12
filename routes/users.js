const expres = require('express');
const router = expres.Router();

const userContoller = require('../controllers/user_controller');

router.get('/profile',userContoller.profile);

module.exports = router;