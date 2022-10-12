const expres = require('express');
const router = expres.Router();

const userContoller = require('../controllers/user_controller');


// routing to profile page
router.get('/profile',userContoller.profile);

// routing to sign-in page
router.get('/sign-in',userContoller.signIn);

// routing to sign-up page
router.get('/sign-up',userContoller.signUp);

module.exports = router;