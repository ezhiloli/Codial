// 1.Require Express
const express = require('express');
// 2.Get router middleware
const router = express.Router();

// 3.Gettting default page or home controller
const homeController = require('../controllers/home_controller');

// 5.Getting the User controller or user redirectingpage


// 4.this one from index.js to refer this
router.get('/',homeController.home);

// 6.for user page
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));


console.log('Router Loaded');


module.exports = router;

