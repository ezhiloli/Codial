// 1.Require express
const express = require('express');
// 12.Require the cookie parser
const cookieParser = require('cookie-parser');
// 3.Set up our app points to express
const app = express();
// 2.Acquire the Port Number
const port = 8080;
// 8.for layouts using express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// 13.require  express-session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss', //
    dest:'./assets/css',
    debug:true, //shows the error 
    outputStyle:'expanded',//output is single line or multi line
    prefix:'/css'
}))


app.use(express.urlencoded());
app.use(cookieParser());

// 10.setting up static files
app.use(express.static('./assets'));

// 9.to tell use this layout before pages going to routing
app.use(expressLayouts);

// 11.if any link,src tags inside my views files i want to tell it should go for lauout file 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);





// //7.for user profile page
// app.use('/users/profile',require('./routes'));

//5.setup our view engine
app.set('view engine','ejs');
app.set('views','./views'); 

// mongo store is used to store the session cookie in the db
app.use(session({
    name:'codial',
    secret:'fhfbg',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect-mongo setup ok');
    }
    )
}));
// saveUninitialized : a session which not initialized (user not logged in) dont want to save extra data in cookie
// resave: Identity is established if we want rewrite or resave same info again

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser)

// 6.use expres router
app.use('/',require('./routes'));

// 4.Check weather the App/port is working or not
app.listen(port,function(err){
    if(err){console.log(`Error while listening port: ${err}`); return;}

    console.log(`server is running on port ::${port}`);
})