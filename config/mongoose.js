const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');

const db = mongoose.connection;

db.on('error',function(err)
{
    console.log( `Error while Connectiing to Mongo DB`) 
    return;
});

db.once('open',function(){
    console.log('Connect to Database :: MongoDB');
})

module.exports = db;