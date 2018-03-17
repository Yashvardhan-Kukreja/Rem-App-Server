const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const Patient = require('../models/patient');

const secret = config.database;


function checkToken(req, res, next) {
    var token = req.body.token || req.headers['x-access-token'];
    if (token){
        jwt.verify(token, secret, function(err, decoded){
            if (err) {
                console.log(err);
                return res.json({success: false, message: "An error occurred"});
            } else {
                if (decoded) {
                    req.decoded = decoded;
                    next();
                } else {
                    return res.json({success: false, message: "Corrupted token provided"});
                }
            }
        });
    } else {
        return res.json({success: false, message: "No token provided"});
    }
}

function authenticate(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    Patient.findOne({email: email}, {_id: 0}).exec(function(err, outputMember){
        if (err) {
            console.log(err);
            res.json({success: false, message: "An error occurred"});
        } else {
            if (!outputMember){
                return res.json({success: false, message: "User not found"});
            } else {
                var validPassword = bcrypt.compareSync(password, outputMember.password);
                if (!validPassword){
                    return res.json({success: false, message: "Wrong password entered"});
                } else {
                    var token = jwt.sign(JSON.parse(JSON.stringify(outputMember)), secret);
                    res.header("set-cookie", "x-access-token="+token);
                    return res.json({success: true, message: "User authenticated  successfully", token: token});
                }
            }
        }
    });
}


function register(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var address = req.body.address;
    var email = req.body.email;
    var password = req.body.password;
    var bio = req.body.bio;

    var newPatient = new Patient({
        name: name,
        username: username,
        address: address,
        email: email,
        password: password,
        bio: bio
    });

    newPatient.save(function(err) {
        if (err){
            console.log(err);
            if (err.code == 11000)
                return res.json({success: false, message: "A user with same details already exists"})
            else
                return res.json({success: false, message: "An error occurred"});
        } else {
            return res.json({success: true, message: "Patient registered successfully"});
        }
    });

}

module.exports = {authenticate: authenticate, checkToken: checkToken, register: register};