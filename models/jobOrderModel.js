const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//task schema
const jobOrderDBSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
    
}, {timestamps: true});

//create task model

const JobOrderDB = mongoose.model('JobOrderDB', jobOrderDBSchema)

//export models
module.exports = JobOrderDB