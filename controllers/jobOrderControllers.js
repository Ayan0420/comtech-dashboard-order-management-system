const JobOrder = require('../models/jobOrderModel');

//jobOrder index
const jobOrder_index = (req, res) => {
    JobOrder.find().sort({createdAt: -1})
        .then(result => {
            res.render('jobOrder/job-orders', {title: 'Dashboard', jobOrders: result})
        })
        .catch(err => console.log("error from the controller" + err));

}

//Single post and edit page
const jobOrder_update_get = (req, res) => {
    const id = req.params.job_id; //params from .../job-details/:job_id

    JobOrder.findById(id)
    .then((result) => {
        res.render('jobOrder/job-details', { title: "Job Order No.: " + result.job_id, jobOrder: result });
    })
    .catch((err) => {
        res.status(404).send('<h1>404: The page you are looking for does not exist!</h1>');
    });
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
            res.redirect(`/job-orders/job-details/${jobOrder._id}`)
        })
        .catch(err => console.log(err))
}


module.exports = {
    jobOrder_index,
    jobOrder_add_get,
    jobOrder_add_post,
    jobOrder_update_get
}