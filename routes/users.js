const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');


// routing to profile page
router.get('/profile',passport.checkAuthentication,userController.profile);

// passport.checkAuthentication,
// routing to sign-in page
router.get('/sign-in',userController.signIn);


// routing to sign-up page
router.get('/sign-up',userController.signUp);

// router.get('/create',userContoller.create);

router.post('/create',userController.create)


router.get('/sign-out',userController.destroySession)

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);

module.exports = router;