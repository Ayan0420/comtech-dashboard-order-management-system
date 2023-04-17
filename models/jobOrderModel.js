const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//task schema
const jobOrderDBSchema = new Schema({
    
    //Customer information
    job_id: {
        type: String,
        required: true
        //make this unique
    },

    job_date: {
        type: String,
        required: true
    },
    cus_name: {
        type: String,
        required: true
    },
    cus_address: {
        type: String,
        required: true
    },
    cus_phone: {
        type: String,
        required: true
    },
    //Unit Information
    unit_model: {
        type: String,
        required: false,
        default: "No Model"
    },
    unit_specs: {
        type: String,
        required: false,
        default: "No Specs"
    },
    unit_accessories: {
        type: String,
        required: false,
        default: "No Accessories"
    },
    work_perf: {
        type: String,
        required: true
    },
    //Job payment info s = service
    s_charge: {
        type: Number,
        required: true
    },
    s_paymeth: {
        type: String,
        required: true
    },
    s_downpay: {
        type: Number,
        required: true
    },
    s_bal: {
        type: Number,
        required: true
    },
    s_status: {
        type: String,
        required: true
    },
    //Parts Order info p = parts
    p_parts: {
        type: String,
        required: false,
    },
    p_ord_date: {
        type: String,
        required: false,
    },
    p_supp: {
        type: String,
        required: false,
    },
    p_price: {
        type: Number,
        required: false,
        default: 0
    },
    p_ord_status: {
        type: String,
        required: false,
    },
    p_installed: {
        type: String,
        required: false,
    },
    //parts payment
    p_downpay: {
        type: Number,
        required: false,
        default: 0
    },
    p_bal: {
        type: Number,
        required: false,
        default: 0
    },
    p_status: {
        type: String,
        required: false,
    },
    p_rel_date: {
        type: String,
        required: false,
    },

}, {timestamps: true});

//create task model

const JobOrderDB = mongoose.model('JobOrderDB', jobOrderDBSchema);

//export models
module.exports = JobOrderDB;
