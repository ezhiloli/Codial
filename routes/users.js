const expres = require('express');
const router = expres.Router();
const passport = require('passport');

const userContoller = require('../controllers/user_controller');


// routing to profile page
router.get('/profile',passport.checkAuthentication,userContoller.profile);
// ,
// routing to sign-in page
router.get('/sign-in',userContoller.signIn);

// routing to sign-up page
router.get('/sign-up',userContoller.signUp);

// router.get('/create',userContoller.create);

router.post('/create',userContoller.create)

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userContoller.createSession);

module.exports = router;