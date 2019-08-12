const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

//creating front end set up here 
app.use(express.static('public')); // looks and serves public folder
//app.use("/public", express.static('./public'));

// use body-parser middleware
app.use(bodyParser.json());

//use error handling middleware
app.use(function(err,req,res,next){
    console.log(err);
    res.status(422).send({error:err.message});

})

// initialize routes
app.use('/api', require('./routes/api'));

// listen for requests
app.listen(process.env.port || 4000, function(){    
    console.log('now listening for requests');
});
