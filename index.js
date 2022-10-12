// 1.Require express
const express = require('express');
// 3.Set up our app points to express
const app = express();
// 2.Acquire the Port Number
const port = 8080;



// 4.Check weather the App/port is working or not
app.listen(port,function(err){
    if(err){console.log(`Error while listening port: ${err}`); return;}

    console.log(`server is running on port ::${port}`);
})