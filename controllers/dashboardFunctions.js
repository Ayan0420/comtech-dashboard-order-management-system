const JobOrder = require('../models/jobOrderModel');

const dashboard = (req, res) => {
    JobOrder.find().sort({createdAt: -1})
        .then(result => {
            //Sales card

             //Services
            let downpayArray = [];
        
            result.forEach((value, index) => {
                downpayArray.push(result[index].s_downpay); 
            });

            let totalDownPay = downpayArray.reduce((x, y) => {
                return x + y;
            });

             //Sales
             let salesDownpayArray = [];
        
             result.forEach((value, index) => {
                salesDownpayArray.push(result[index].p_downpay); 
             });
 
             let totalSalesDownPay = salesDownpayArray.reduce((x, y) => {
                 return x + y;
             });

             //Total Revenue

             let totalRevenue = totalDownPay + totalSalesDownPay;

            //Sales card End

            //Total Job Orders Card
            let totalJobOrders = result.length
            //Total Job Orders Card End
            
            //Current Orders Card
            const countCurrentOrders = () => {
                let currentOrders = [];
                
                //loop through the all the contents of the db and filter s_status and append the result to currentOrders array.
                for(let i = 0; i < result.length; i++){
                    if (result[i].s_status !== 'ONGOING'){
                        continue;
                    } else {
                        currentOrders.push(result[i].s_status);
                    }
                }

                return currentOrders.length
            }

            let currentOrdersCount = countCurrentOrders();
            console.log("Current Job Orders: " + currentOrdersCount);
             //Current Orders Card End

            //Parts Ordered Card
            const countCurrentPartsOrders = () => {
                let currentPartsOrders = [];
                
                //loop through the all the contents of the db and filter p_status and append the result to currentPartsOrders array.
                for(let i = 0; i < result.length; i++){
                    if (result[i].p_status === 'N/A' || result[i].p_status !== 'PARTIALLY PAID'){
                        continue;
                    } else {
                        currentPartsOrders.push(result[i].p_status);
                    }
                }
                return currentPartsOrders.length
            }

            let currentPartsOrdersCount = countCurrentPartsOrders();
            console.log("Current Parts Orders: " + currentPartsOrdersCount);
            //Parts Ordered Card End

             //Unclaimed Orders Card
             const countUnclaimedOrders = () => {
                let currentUnclaimedOrders = [];

                //loop through the all the contents of the db and filter s_status and append the result to currentUnclaimedOrders array.
                for(let i = 0; i < result.length; i++){
                    if (result[i].s_status === 'PAID/UNRELEASED' || result[i].s_status === 'DONE/UNRELEASED' || result[i].s_status === 'DMD/UNRELEASED'){
                        currentUnclaimedOrders.push(result[i].s_status);  
                    } else {
                        continue;
                    }
                }
                console.log(currentUnclaimedOrders);
                return currentUnclaimedOrders.length
            }

            let currentUnclaimedOrdersCount = countUnclaimedOrders();
            console.log("Current Unclaimed Orders: " + currentUnclaimedOrdersCount);
            //Unclaimed Orders End

            //DMD Orders Card
            const countDMDOrders = () => {
            let currentDMDOrders = [];
            
            //loop through the all the contents of the db and filter s_status and append the result to currentDMDOrders array.
            for(let i = 0; i < result.length; i++){
                if (result[i].s_status === 'DMD/RELEASED' || result[i].s_status === 'DMD/UNRELEASED'){
                    currentDMDOrders.push(result[i].s_status);  
                    } else {
                        continue;
                    }
                }
                console.log(currentDMDOrders);
                return currentDMDOrders.length
           }

            let currentDMDOrdersCount = countDMDOrders();
            console.log("Current DMD Orders: " + currentDMDOrdersCount);
            //DMD Orders End

            //response object
            res.render('jobOrder/job-orders', {title: 'Dashboard', jobOrders: result, flashMessage: req.flash('message'), totalDownPay, totalSalesDownPay, totalRevenue, totalJobOrders, currentOrdersCount, currentPartsOrdersCount, currentUnclaimedOrdersCount, currentDMDOrdersCount});
        })
        .catch(err => console.log("error from the controller" + err));
}

module.exports = {
    dashboard
};