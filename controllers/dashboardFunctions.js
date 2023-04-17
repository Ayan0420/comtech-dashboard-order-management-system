const JobOrder = require('../models/jobOrderModel');

const dashboard = (req, res) => {
    JobOrder.find().sort({createdAt: -1})
        .then(data => {
            //Current Month Filter - this section filters the data showing only the data for the current month.
            let dateNow = new Date(); //instantiation a new Date object called dateNow
            let monthNow = dateNow.getMonth() + 1;
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let monthNowName = months[dateNow.getMonth()];
            
            yearNow = dateNow.getFullYear();
            console.log('yearNow', yearNow)
                // console.log("Date Now Object: " + dateNow)
                // console.log("Month Today: " + monthNow)
                // console.log("Year Today: " + yearNow)
                // console.log(monthNowName)

            let dataByCurrentMonth = []; //use this filtered data array for functions dependent on current

            //this for loop is used to append filtered data by current month to the dataByCurrentMonth array.
            for(let i = 0; i < data.length; i++){
                let month = data[i].job_date.substring(5, 7); //removing 2023- and -11 from 2023-02-11 leaving only 02.
                
                if (month != monthNow){
                    continue;
                } else {
                    dataByCurrentMonth.push(data[i]);
                }
            }
            // console.log(dataByCurrentMonth);
            //Current Date Filter End
            
            //Sales card
             //Services
            let downpayArray = [0];
        
            dataByCurrentMonth.forEach((value, index) => {
                downpayArray.push(dataByCurrentMonth[index].s_downpay); 
            });

            let totalDownPay = downpayArray.reduce((x, y) => {
                return x + y;
            });

             //Sales
             let salesDownpayArray = [0];
        
             dataByCurrentMonth.forEach((value, index) => {
                salesDownpayArray.push(dataByCurrentMonth[index].p_downpay); 
             });
 
             let totalSalesDownPay = salesDownpayArray.reduce((x, y) => {
                 return x + y;
             });

             //Total Revenue

             let totalRevenue = totalDownPay + totalSalesDownPay;

            //Sales card End

            //Total Job Orders Card
            let totalJobOrders = data.length
            //Total Job Orders Card End
            
            //Current Orders Card
            const countCurrentOrders = () => {
                let currentOrders = [];
                
                //loop through the all the contents of the db and filter s_status and append the data to currentOrders array.
                for(let i = 0; i < data.length; i++){
                    if (data[i].s_status !== 'ONGOING'){
                        continue;
                    } else {
                        currentOrders.push(data[i].s_status);
                    }
                }

                return currentOrders.length
            }

            let currentOrdersCount = countCurrentOrders();
            // console.log("Current Job Orders: " + currentOrdersCount);
             //Current Orders Card End

            //Parts Ordered Card
            const countCurrentPartsOrders = () => {
                let currentPartsOrders = [];
                
                //loop through the all the contents of the db and filter p_status and append the data to currentPartsOrders array.
                for(let i = 0; i < data.length; i++){
                    if (data[i].p_status === 'N/A' || data[i].p_status !== 'PARTIALLY PAID'){
                        continue;
                    } else {
                        currentPartsOrders.push(data[i].p_status);
                    }
                }
                return currentPartsOrders.length
            }

            let currentPartsOrdersCount = countCurrentPartsOrders();
            // console.log("Current Parts Orders: " + currentPartsOrdersCount);
            //Parts Ordered Card End

             //Unclaimed Orders Card
             const countUnclaimedOrders = () => {
                let currentUnclaimedOrders = [];

                //loop through the all the contents of the db and filter s_status and append the data to currentUnclaimedOrders array.
                for(let i = 0; i < data.length; i++){
                    if (data[i].s_status === 'PAID/UNRELEASED' || data[i].s_status === 'DONE/UNRELEASED' || data[i].s_status === 'DMD/UNRELEASED'){
                        currentUnclaimedOrders.push(data[i].s_status);  
                    } else {
                        continue;
                    }
                }
                // console.log(currentUnclaimedOrders);
                return currentUnclaimedOrders.length
            }

            let currentUnclaimedOrdersCount = countUnclaimedOrders();
            // console.log("Current Unclaimed Orders: " + currentUnclaimedOrdersCount);
            //Unclaimed Orders End

            //DMD Orders Card
            const countDMDOrders = () => {
                let currentDMDOrders = [];
                
                //loop through the all the contents of the db and filter s_status and append the data to currentDMDOrders array.
                for(let i = 0; i < dataByCurrentMonth.length; i++){
                    if (dataByCurrentMonth[i].s_status === 'DMD/RELEASED' || dataByCurrentMonth[i].s_status === 'DMD/UNRELEASED'){
                        currentDMDOrders.push(dataByCurrentMonth[i].s_status);  
                        } else {
                            continue;
                        }
                    }
                    // console.log(currentDMDOrders);
                    return currentDMDOrders.length
           }

            let currentDMDOrdersCount = countDMDOrders();
            // console.log("Current DMD Orders: " + currentDMDOrdersCount);
            //DMD Orders End

            //Monthly Sales Chart Data
            let getMonthlyChartData = () => {
                // total sales per month
                let janSales = [0], 
                    febSales = [0], 
                    marSales = [0], 
                    aprSales = [0], 
                    maySales = [0], 
                    junSales = [0], 
                    julSales = [0], 
                    augSales = [0], 
                    sepSales = [0], 
                    octSales = [0], 
                    novSales = [0], 
                    decSales = [0];

                
                for(let i = 0; i < data.length; i++){
                    let salesMonth = data[i].job_date.substring(5, 7); //removing 2023- and -11 from 2023-02-11 leaving only 02.
                    let salesYear = data[i].job_date.substring(0, 4);

                    //to fetch sales only from current year
                    if(salesYear != yearNow){
                        continue
                    } 

                    //to append data for each month
                    if(salesMonth === '01'){
                        janSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '02'){
                        febSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '03'){
                        marSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '04'){
                        aprSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '05'){
                        maySales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '06'){
                        junSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '07'){
                        julSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '08'){
                        augSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '09'){
                        sepSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '10'){
                        octSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '11'){
                        novSales.push(data[i].s_downpay + data[i].p_downpay);
                    } else if(salesMonth === '12'){
                        decSales.push(data[i].s_downpay + data[i].p_downpay);
                    }
                }


                return sales = {
                    currYear: yearNow,
                    janSales: janSales.reduce((x, y) => x + y),
                    febSales: febSales.reduce((x, y) => x + y),
                    marSales: marSales.reduce((x, y) => x + y),
                    aprSales: aprSales.reduce((x, y) => x + y),
                    maySales: maySales.reduce((x, y) => x + y),
                    junSales: junSales.reduce((x, y) => x + y),
                    julSales: julSales.reduce((x, y) => x + y),
                    augSales: augSales.reduce((x, y) => x + y),
                    sepSales: sepSales.reduce((x, y) => x + y),
                    octSales: octSales.reduce((x, y) => x + y),
                    novSales: novSales.reduce((x, y) => x + y),
                    decSales: decSales.reduce((x, y) => x + y)
                }
            };
            let monthlyChartData = getMonthlyChartData()
            //Monthly Sales Chart Data End
            
            //response object
            res.render('jobOrder/job-orders', {title: 'Dashboard', jobOrders: data, flashMessage: req.flash('message'), monthNowName,  totalDownPay, totalSalesDownPay, totalRevenue, totalJobOrders, currentOrdersCount, currentPartsOrdersCount, currentUnclaimedOrdersCount, currentDMDOrdersCount, monthlyChartData});
        })
        .catch(err => console.log("error from the controller" + err));
}

module.exports = {
    dashboard
};