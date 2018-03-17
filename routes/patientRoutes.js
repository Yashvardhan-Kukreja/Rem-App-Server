const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

const authMiddlewares = require('../middlewares/authenticate');

router.use(function(req, res, next){
    authMiddlewares.checkToken(req, res, next);
});

router.post('/getPatientDetails', function(req, res){
    Patient.findOne({_id: req.decoded._id}, {_id: 0, password: 0}).exec(function(err, outputPatient){
        if (err) {
            console.log(err);
            res.json({success: false, message: "An error occurred"});
        } else {
            if (!outputPatient) {
                res.json({success: false, message: "Patient not found"});
            } else {
                res.json({success: true, message: "Patient details fetched", patient: outputPatient});
            }
        }
    });
});

router.post('/addContact', function(req, res){
    var name = req.body.name;
    var contact = req.body.contact;

    var newContact = {
        name: name,
        contact: contact
    };

    Patient.findOneAndUpdate({_id: req.decoded._id}, {$push:{contacts: newContact}}).exec(function(err, outputPatient){
        if (err) {
            console.log(err);
            res.json({success: false, message: "An error occurred"});
        } else {
            if (!outputPatient) {
                res.json({success: false, message: "Patient not found"});
            } else {
                res.json({success: true, message: name+" added as contact"});
            }
        }
    });
});

router.post('/addNotes', function(req, res){
    var note = req.body.note;

    Patient.findOneAndUpdate({_id: req.decoded._id}, {$push:{notes: note}}).exec(function(err, outputPatient){
        if (err) {
            console.log(err);
            res.json({success: false, message: "An error occurred"});
        } else {
            if (!outputPatient) {
                res.json({success: false, message: "Patient not found"});
            } else {
                res.json({success: true, message: "Added a note"});
            }
        }
    });
});

router.post('/addEvent', function(req, res){
    var event = req.body.event;

    Patient.findOneAndUpdate({_id: req.decoded._id}, {$push:{events: event}}).exec(function(err, outputPatient){
        if (err) {
            console.log(err);
            res.json({success: false, message: "An error occurred"});
        } else {
            if (!outputPatient) {
                res.json({success: false, message: "Patient not found"});
            } else {
                res.json({success: true, message: "Added an event"});
            }
        }
    });
});


module.exports = router;
