const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


var patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    notes: [
        {
            type: String
        }
    ],
    closedOnes: [
        {
            name: {
                type: String
            },
            contact: {
                type: String
            }
        }
    ]
});

patientSchema.pre('save', function(next){
    var patient = this;
    bcrypt.hash(patient.password, null, null, function(err, hash){
        if (err)
            return next(err);
        patient.password = hash;
        next();
    });
});

module.exports = mongoose.model('Patient', patientSchema, "patients");
