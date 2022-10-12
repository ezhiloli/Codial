// 1.Require express
const express = require('express');
// 12.Require the cookie parser
const cookieParser = require('cookie-parser')
// 3.Set up our app points to express
const app = express();
// 2.Acquire the Port Number
const port = 8080;
// 8.for layouts using express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// 11.if any link,src tags inside my views files i want to tell it should go for lauout file 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.urlencoded());
app.use(cookieParser());

// 10.setting up static files
app.use(express.static('./assets'));

// 9.to tell use this layout before pages going to routing
app.use(expressLayouts);

// 6.use expres router
app.use('/',require('./routes'));

// //7.for user profile page
// app.use('/users/profile',require('./routes'));

//5.setup our view engine
app.set('view engine','ejs');
app.set('views','./views'); 


// 4.Check weather the App/port is working or not
app.listen(port,function(err){
    if(err){console.log(`Error while listening port: ${err}`); return;}

    console.log(`server is running on port ::${port}`);
})