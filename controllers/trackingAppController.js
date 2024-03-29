const mongoose = require('mongoose');
const JobOrder = require('../models/jobOrderModel');

const trackingApp_index = (req, res) => {

    res.render('trackingApp/index.ejs', {flashMessage: req.flash('message'), searchData: "", searchCode: ""});
}

const trackingApp_search = (req, res) => {
    let searchData = req.body.tracking;
    let searchCode = req.body.code;
    JobOrder.findOne({job_id: searchData})
    .then( result => {
        console.log(result) //for debugging
        if(result === null){
            req.flash('message', 'No Job Order found! Please input a correct Job Order Number.')
            res.redirect('/tracking-app/')
            return
        }
        
        if(searchCode.toUpperCase() !== result.tracking_code){
            
            req.flash('message', 'Tracking code incorrect. Please check the code if typed properly.')
            res.render('trackingApp/index.ejs', {flashMessage: req.flash('message'), searchData, searchCode})
            return
        }
        
        res.redirect(`/tracking-app/${result._id}`);
        
    })
    .catch(err => {
        console.log('Error from controller: ' + err);
    });
    
    
}

const trackingApp_scanQr = (req, res) => {

    res.render('trackingApp/scan-qr');
}

const trackingApp_result = (req, res) => {
    const id = req.params.id;
    JobOrder.findById(id)
    .then(result => {
        console.log(result)
        res.render('trackingApp/job-details', {searchResult: result})
    })
    .catch(err => {
        res.status(404).send('<h1>404: The page you are looking for does not exist!</h1>');
        console.log("Error from controller " + err);
    });
}

module.exports = {
    trackingApp_index,
    trackingApp_search,
    trackingApp_result,
    trackingApp_scanQr
}

