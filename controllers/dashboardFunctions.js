const JobOrder = require('../models/jobOrderModel');

const dashboard = (req, res) => {
    JobOrder.find().sort({createdAt: -1})
        .then(data => {
            //Current Month Filter - this section filters the data showing only the data for the current month.
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let dateNow = new Date(); //instantiation a new Date object called dateNow
            let monthNow = dateNow.getMonth() + 1;
            let monthNowName = months[dateNow.getMonth()];
            let yearNow = dateNow.getFullYear();
            // console.log('yearNow', yearNow)
                // console.log("Date Now Object: " + dateNow)
                // console.log("Month Today: " + monthNow)
                // console.log("Year Today: " + yearNow)
                // console.log(monthNowName)

            let dataByCurrentMonth = []; //use this filtered data array for functions dependent on current

            //this for loop is used to append filtered data by current month to the dataByCurrentMonth array.
            for(let i = 0; i < data.length; i++){
                let month = data[i].job_date.substring(5, 7); //removing 2023- and -11 from 2023-02-11 leaving only 02.
                let salesYear = data[i].job_date.substring(0, 4);

                //to fetch sales only from current year
                if(salesYear != yearNow){
                    continue
                } 

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
                        janSales.push(data[i].s_downpay);
                    } else if(salesMonth === '02'){
                        febSales.push(data[i].s_downpay);
                    } else if(salesMonth === '03'){
                        marSales.push(data[i].s_downpay);
                    } else if(salesMonth === '04'){
                        aprSales.push(data[i].s_downpay);
                    } else if(salesMonth === '05'){
                        maySales.push(data[i].s_downpay);
                    } else if(salesMonth === '06'){
                        junSales.push(data[i].s_downpay);
                    } else if(salesMonth === '07'){
                        julSales.push(data[i].s_downpay);
                    } else if(salesMonth === '08'){
                        augSales.push(data[i].s_downpay);
                    } else if(salesMonth === '09'){
                        sepSales.push(data[i].s_downpay);
                    } else if(salesMonth === '10'){
                        octSales.push(data[i].s_downpay);
                    } else if(salesMonth === '11'){
                        novSales.push(data[i].s_downpay);
                    } else if(salesMonth === '12'){
                        decSales.push(data[i].s_downpay);
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

            //Anual Sales Chard Data (until 2040)
            let getAnnualData = () => {
                // total sales per month
                let sales2021 = [0], 
                    sales2022 = [0], 
                    sales2023 = [0], 
                    sales2024 = [0], 
                    sales2025 = [0], 
                    sales2026 = [0], 
                    sales2027 = [0], 
                    sales2028 = [0], 
                    sales2029 = [0], 
                    sales2030 = [0],
                    sales2031 = [0],
                    sales2032 = [0],
                    sales2033 = [0],
                    sales2034 = [0],
                    sales2035 = [0],
                    sales2036 = [0],
                    sales2037 = [0],
                    sales2038 = [0],
                    sales2039 = [0],
                    sales2040 = [0];
                    
                    //to append data for each year
                for(let i = 0; i < data.length; i++){  
                    let salesYear = data[i].job_date.substring(0, 4);
                    
                    if(salesYear === '2021'){
                        sales2021.push(data[i].s_downpay);
                    } else if(salesYear === '2022'){
                        sales2022.push(data[i].s_downpay);
                    } else if(salesYear === '2023'){
                        sales2023.push(data[i].s_downpay);
                    } else if(salesYear === '2024'){
                        sales2024.push(data[i].s_downpay);
                    } else if(salesYear === '2025'){
                        sales2025.push(data[i].s_downpay);
                    } else if(salesYear === '2026'){
                        sales2026.push(data[i].s_downpay);
                    } else if(salesYear === '2027'){
                        sales2027.push(data[i].s_downpay);
                    } else if(salesYear === '2028'){
                        sales2028.push(data[i].s_downpay);
                    } else if(salesYear === '2029'){
                        sales2029.push(data[i].s_downpay);
                    } else if(salesYear === '2030'){
                        sales2030.push(data[i].s_downpay);
                    } else if(salesYear === '2031'){
                        sales2031.push(data[i].s_downpay);
                    } else if(salesYear === '2032'){
                        sales2032.push(data[i].s_downpay);
                    } else if(salesYear === '2033'){
                        sales2033.push(data[i].s_downpay);
                    } else if(salesYear === '2034'){
                        sales2034.push(data[i].s_downpay);
                    } else if(salesYear === '2035'){
                        sales2035.push(data[i].s_downpay);
                    } else if(salesYear === '2036'){
                        sales2036.push(data[i].s_downpay);
                    } else if(salesYear === '2037'){
                        sales2037.push(data[i].s_downpay);
                    } else if(salesYear === '2038'){
                        sales2038.push(data[i].s_downpay);
                    } else if(salesYear === '2039'){
                        sales2039.push(data[i].s_downpay);
                    } else if(salesYear === '2040'){
                        sales2040.push(data[i].s_downpay);
                    } 
                }
                return sales = {
                    sales2021: sales2021.reduce((x, y) => x + y),
                    sales2022: sales2022.reduce((x, y) => x + y),
                    sales2023: sales2023.reduce((x, y) => x + y),
                    sales2024: sales2024.reduce((x, y) => x + y),
                    sales2025: sales2025.reduce((x, y) => x + y),
                    sales2026: sales2026.reduce((x, y) => x + y),
                    sales2027: sales2027.reduce((x, y) => x + y),
                    sales2028: sales2028.reduce((x, y) => x + y),
                    sales2029: sales2029.reduce((x, y) => x + y),
                    sales2030: sales2030.reduce((x, y) => x + y),
                    sales2031: sales2031.reduce((x, y) => x + y),
                    sales2032: sales2032.reduce((x, y) => x + y),
                    sales2033: sales2033.reduce((x, y) => x + y),
                    sales2034: sales2034.reduce((x, y) => x + y),
                    sales2035: sales2035.reduce((x, y) => x + y),
                    sales2036: sales2036.reduce((x, y) => x + y),
                    sales2037: sales2037.reduce((x, y) => x + y),
                    sales2038: sales2038.reduce((x, y) => x + y),
                    sales2039: sales2039.reduce((x, y) => x + y),
                    sales2040: sales2040.reduce((x, y) => x + y)
                }
            };
            //Anual Sales Chard Data (until 2040) End

            let annualChartData = getAnnualData()
            console.log('annualChartData', annualChartData)
            
            //response object
            res.render('jobOrder/job-orders', {
                title: 'Dashboard', 
                flashMessage: req.flash('message'), 

                jobOrders: data, 
                monthNowName,
                
                totalDownPay,
                totalSalesDownPay,
                totalRevenue, 
                totalJobOrders, 

                currentOrdersCount, 
                currentPartsOrdersCount, 
                currentUnclaimedOrdersCount, 
                currentDMDOrdersCount, 

                monthlyChartData, 
                annualChartData
            });
        })
        .catch(err => console.log("error from the controller" + err));
}

module.exports = {
    dashboard
};