const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const db = config.database;
const port = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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