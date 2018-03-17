const mongoose = require('mongoose');
const Patient = require('../models/patient');
const express = require('express');
const authMiddlewares = require('../middlewares/authenticate');

const router = express.Router();

router.post('/login', function(req, res){
    authMiddlewares.authenticate(req, res);
});

router.post('/registerPatient', function(req, res){
    authMiddlewares.register(req, res);
});

module.exports = router;

