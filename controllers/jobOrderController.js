const JobOrder = require('../models/jobOrderModel');
const dashboardFunctions = require('./dashboardFunctions')
const {generateJobOrderSlip} = require('../report_generator/report_generator')

    //JobOrder APP CONTROLLERS//

//jobOrder index (dashboard)
const jobOrder_index = dashboardFunctions.dashboard;

//job order lists with filters
const jobOrder_list = (req, res) => {
    let jobOrderList = req.params.list;
    
    if(jobOrderList === "all"){
        JobOrder.find({}).sort({createdAt: -1}).then(result => {
            res.render('jobOrder/job-list', {jobOrders: result, title: "All Jobs", jobCount: result.length, flashMessage: req.flash('message') });
        }) 
    } else if(jobOrderList === "on-going"){
        JobOrder.find({s_status: "ONGOING"}).sort({createdAt: -1}).then(result => {
            res.render('jobOrder/job-list', {jobOrders: result, title: "On-Going Jobs", jobCount: result.length, flashMessage: req.flash('message') });
        });
    } else if(jobOrderList === "parts-orders"){
        JobOrder.find({}).then(result => {
            let currentPartsOrders = [];
                
            //loop through the all the contents of the db and filter p_status and append the data to currentPartsOrders array.
            for(let i = 0; i < result.length; i++){
                if (result[i].p_status === 'N/A' || result[i].p_status !== 'PARTIALLY PAID'){
                    continue;
                } else {
                    currentPartsOrders.push(result[i]);
                }
            }
            res.render('jobOrder/job-list', {jobOrders: currentPartsOrders, title: "Parts Orders", jobCount: currentPartsOrders.length, flashMessage: req.flash('message') });
        });
    }  else if(jobOrderList === "unclaimed"){
        JobOrder.find({}).sort({createdAt: -1}).then(result => {

            let currentUnclaimedOrders = [];

            //loop through the all the contents of the db and filter s_status and append the data to currentUnclaimedOrders array.
            for(let i = 0; i < result.length; i++){
                if (result[i].s_status === 'PAID/UNRELEASED' || result[i].s_status === 'DONE/UNRELEASED' || result[i].s_status === 'DMD/UNRELEASED'){
                    currentUnclaimedOrders.push(result[i]);  
                } else {
                    continue;
                }
            }
            res.render('jobOrder/job-list', {jobOrders: currentUnclaimedOrders, title: "Unclaimed Jobs", jobCount: currentUnclaimedOrders.length, flashMessage: req.flash('message') });
        });
    } else if(jobOrderList === "dmd"){
        JobOrder.find({}).sort({createdAt: -1}).then(result => {
            
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let dateNow = new Date(); //instantiation a new Date object called dateNow
            let monthNow = dateNow.getMonth() + 1;
            let monthNowName = months[dateNow.getMonth()];
            let yearNow = dateNow.getFullYear();

            let dataByCurrentMonth = []; //use this filtered result array for functions dependent on current
            let currentDMDOrders = [];

            //this for loop is used to append filtered result by current month to the resultByCurrentMonth array.
            for(let i = 0; i < result.length; i++){
                let month = result[i].job_date.substring(5, 7); //removing 2023- and -11 from 2023-02-11 leaving only 02.
                let salesYear = result[i].job_date.substring(0, 4);

                //to fetch sales only from current year
                if(salesYear != yearNow){
                    continue
                } 

                if (month != monthNow){
                    continue;
                } else {
                    dataByCurrentMonth.push(result[i]);
                }
            }

            for(let i = 0; i < dataByCurrentMonth.length; i++){
                if (dataByCurrentMonth[i].s_status === 'DMD/RELEASED' || dataByCurrentMonth[i].s_status === 'DMD/UNRELEASED'){
                    currentDMDOrders.push(dataByCurrentMonth[i]);  
                    } else {
                        continue;
                    }
            }

            res.render('jobOrder/job-list', {jobOrders: currentDMDOrders, title: `DMD (${monthNowName})`, jobCount: currentDMDOrders.length, flashMessage: req.flash('message') });
        });
    } else {
        res.status(404).render('landingPage/404', {title: "404"});
    }
};
 
    //search jobs
const jobOrder_search = async (req, res) => {
    let payload = req.body.payload.trim(); //trim() will remove white spaces
    let search = await JobOrder.find({$or: [
        {job_id: {$regex: new RegExp(payload , 'i')}},
        {job_date: {$regex: new RegExp(payload , 'i')}},
        {cus_name: {$regex: new RegExp(payload, 'i')}},
        {cus_address: {$regex: new RegExp(payload , 'i')}},
        {unit_model: {$regex: new RegExp(payload , 'i')}},
        {work_perf: {$regex: new RegExp(payload , 'i')}},
        {s_status: {$regex: new RegExp(payload , 'i')}},
    ]}).exec();
    
    //limit to 10 results
    search = search.slice(0, 10);
    
    res.send({payload: search});
};

//print job order
const jobOrder_print = (req, res) => {
    const id = req.params.job_id; //params from .../job-print/:job_id

    JobOrder.findById(id)
    .then((data) => {
        // console.log(result)

        generateJobOrderSlip(data).then(result => {

            const pdfPath = path.join(__dirname, '../report_generator/job-order-slip.pdf')
            res.setHeader('Content-Disposition', 'inline');
            res.sendFile(pdfPath);
                        
        });
    })
    .catch((err) => {
        res.status(404).send('<h1>Error printing!</h1>');
    });
}

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
    let reqBody = req.body
    
    if(reqBody.p_parts == ""){
        reqBody.p_parts = "N/A"
    }
    if(reqBody.p_supp == ""){
        reqBody.p_supp = "N/A"
    }
    if(reqBody.unit_specs == ""){
        reqBody.unit_specs = "N/A"
    }
    if(reqBody.unit_accessories == ""){
        reqBody.unit_accessories = "N/A"
    }
    console.log(reqBody)
    JobOrder.findByIdAndUpdate({_id: id}, reqBody, (err, data) => {
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
    let reqBody = req.body

    if(reqBody.p_parts = ""){
        reqBody.p_parts = "N/A"
    }
    if(reqBody.p_supp = ""){
        reqBody.p_supp = "N/A"
    }
    if(reqBody.unit_specs == ""){
        reqBody.unit_specs = "N/A"
    }
    if(reqBody.unit_accessories == ""){
        reqBody.unit_accessories = "N/A"
    }

    console.log(reqBody)
    const jobOrder = new JobOrder(reqBody);
    jobOrder.save()
        .then(result => {
            //To add the Tracking code based on it's _id. 
            JobOrder.findByIdAndUpdate({_id: result._id}, {tracking_code: result._id.toString().toUpperCase().slice(-6)}, (err, data) => {
                if (err) {
                    console.log("There's an error updating Job: " + err);
                } else {
                    req.flash('message', 'Job Order added successfully!')
                    res.redirect(`/job-orders/job-details/${jobOrder._id}`);
                }
            });
            // console.log(result)

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
        res.json({redirectToHome: "/job-orders/job-orders/all"})
    })
    .catch(err => console.log("There's an error in the server side deleting J.O." + err));
}

//END ROUTE CONTROLLERS

module.exports = {
    jobOrder_index,
    jobOrder_list,
    jobOrder_search,
    jobOrder_print,
    jobOrder_add_get,
    jobOrder_add_post,
    jobOrder_update_get,
    jobOrder_update_post,
    jobOrder_delete,
}