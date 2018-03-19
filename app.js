const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');


const patientRoutes = require('./routes/patientRoutes');
const authenticationRoutes = require('./routes/authenticateRoutes');

const db = process.env.DATABASE;
const port = process.env.PORT || 8000;
const app = express();

// Using the morgan dependency track the logs
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Dependencies for improving the security of the back end
app.use(helmet());
app.use(compression());

// Adding the routes to the server
app.use('/authenticate', authenticationRoutes);
app.use('/patient', patientRoutes);


mongoose.connect(db, function(err){
    if (err){
        console.log("Error connecting the database");
    } else {
        console.log("Database connected successfully...");
    }
});

app.listen(port, function(){
    console.log("App listening on port number: " + port + " ...");
});