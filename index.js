// 1.Require express
const express = require('express');
// 3.Set up our app points to express
const app = express();
// 2.Acquire the Port Number
const port = 8080;

// 6.use expres router
app.use('/',require('./routes'));

//5.setup our view engine
app.set('view engine','ejs');
app.set('views','./views'); 


// 4.Check weather the App/port is working or not
app.listen(port,function(err){
    if(err){console.log(`Error while listening port: ${err}`); return;}

    console.log(`server is running on port ::${port}`);
})