const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const config = require('./config');
const patientRoutes = require('./routes/patientRoutes');
const authenticationRoutes = require('./routes/authenticateRoutes');

const db = config.database;
const port = process.env.PORT || 8000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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