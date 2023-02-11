const JobOrder = require('../models/jobOrderModel');


    //JobOrder APP CONTROLLERS//

//jobOrder index
const jobOrder_index = (req, res) => {
    JobOrder.find().sort({createdAt: -1})
        .then(result => {
            let downpayArray = [];
            let totalJobOrder = result.length

            result.forEach((value, index) => {
                downpayArray.push(result[index].s_downpay); 
            });
            let totalDownPay = downpayArray.reduce((x, y) => {
                return x + y;
            });
            console.log();
            console.log(totalDownPay);   

            res.render('jobOrder/job-orders', {title: 'Dashboard', jobOrders: result, flashMessage: req.flash('message'), totalDownPay, totalJobOrder});
        })
        .catch(err => console.log("error from the controller" + err));
    
    
}

//search jobs
const jobOrder_search = async (req, res) => {
    let payload = req.body.payload.trim(); //trim() will remove the white spaces
    let search = await JobOrder.find({$or: [
        {job_id: {$regex: new RegExp('^' + payload + '.*', 'i')}},
        {job_date: {$regex: new RegExp('^' + payload + '.*', 'i')}},
        {cus_name: {$regex: new RegExp('^' + payload + '.*', 'i')}},
        {cus_address: {$regex: new RegExp('^' + payload + '.*', 'i')}},
        {unit_model: {$regex: new RegExp('^' + payload + '.*', 'i')}},
        {work_perf: {$regex: new RegExp('^' + payload + '.*', 'i')}},
        {s_status: {$regex: new RegExp('^' + payload + '.*', 'i')}},
    ]}).exec();
    //limit to 5 results
    search = search.slice(0, 6);
    
    res.send({payload: search});
};

//Single job and edit page
    
    //show job
const jobOrder_update_get = (req, res) => {
    const id = req.params.job_id; //params from .../job-details/:job_id

    JobOrder.findById(id)
    .then((result) => {
        res.render('jobOrder/job-details', { title: "Job Order No.: " + result.job_id, jobOrder: result, flashMessage: req.flash('message') });
    })
    .catch((err) => {
        res.status(404).send('<h1>404: The page you are looking for does not exist!</h1>');
    });
};
    //post edited job

const jobOrder_update_post = (req, res) => {

    const id = req.params.job_id; 
    
    JobOrder.findByIdAndUpdate({_id: id}, req.body, (err, data) => {
        if (err) {
            console.log("There's an error updating Job: " + err);
        } else {
            req.flash('message', 'Job Order updated successfully!')
            res.redirect(`/job-orders/job-details/${id}`);
            console.log("\nJ.O. updated successfully: " + id + "\n");
        }
    });
}


//create and post jobOrder
const jobOrder_add_get = (req, res) => {

    res.render('jobOrder/job-add', {title: 'Add New Job Order'});
}

const jobOrder_add_post = (req, res) => {
    console.log(req.body)
    const jobOrder = new JobOrder(req.body);
    jobOrder.save()
        .then(result => {
            req.flash('message', 'Job Order added successfully!')
            res.redirect(`/job-orders/job-details/${jobOrder._id}`);
        })
        .catch(err => console.log(err));
}


// delete job order

const jobOrder_delete = (req, res) => {

    const id = req.params.job_id;
    console.log(id)

    JobOrder.findByIdAndDelete(id)
    .then(result => {
        req.flash('message', 'Job Order deleted successfully!')
        res.json({redirectToHome: "/job-orders"})
    })
    .catch(err => console.log("There's an error in the server side deleting J.O." + err));
}

//END ROUTE CONTROLLERS

module.exports = {
    jobOrder_index,
    jobOrder_search,
    jobOrder_add_get,
    jobOrder_add_post,
    jobOrder_update_get,
    jobOrder_update_post,
    jobOrder_delete,
}