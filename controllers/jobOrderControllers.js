const JobOrder = require('../models/jobOrderModel');

//jobOrder index
const jobOrder_index = (req, res) => {
    JobOrder.find().sort({createdAt: -1})
        .then(result => {
            res.render('jobOrder/job-orders', {title: 'Dashboard', jobOrders: result})
        })
        .catch(err => console.log("error from the controller" + err));
}
//create and post jobOrder
const jobOrder_add_get = (req, res) => {
    res.render('jobOrder/job-add', {title: 'Add New Job Order'})
}
const jobOrder_add_post = (req, res) => {
    console.log(req.body)
    const jobOrder = new JobOrder(req.body);
    jobOrder.save()
        .then(result => {
            res.redirect('/todo')
        })
        .catch(err => console.log(err))
}

module.exports = {
    jobOrder_index,
    jobOrder_add_get,
    jobOrder_add_post
}