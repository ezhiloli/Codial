// 1.Require Express
const expres = require('express');
// 2.Get router middleware
const router = expres.Router();

// 3.Gettting default page or home controller
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);


console.log('Router Loaded');


module.exports = router;

