const mongoose = require('mongoose');
const JobOrder = require('../models/jobOrderModel');

const trackingApp_index = (req, res) => {

    res.render('trackingApp/index.ejs');
}

const trackingApp_search = (req, res) => {
    let searchData = req.body.tracking;
    JobOrder.findOne({job_id: searchData})
    .then( result => {
        console.log(result)
        //use mongoose.Types.ObjectId() to convert the id to string instead of "new ObjectId("id...")"
        res.redirect(`/tracking-app/${result._id}`);

    })
    .catch(err => {
        console.log('Error from controller: ' + err);
    });
    
    
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
}

