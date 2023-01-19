require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

//external routes
const jobOrderRoutes = require('./routes/jobOrderRoutes')

//create app
const app = express();

//db connection
const dbURI = process.env.DB_URI
mongoose.set('strictQuery', true); //deprecation
mongoose.connect(dbURI)
    .then(result => {
        console.log('connected to db')
        //development mode
        app.listen(3000, () => console.log('Server Started listening to http://localhost:3000 ...'))
    })
    .catch(err => console.log(err));

//set view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('/pubic'));
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))

            //ROUTES//

//Landing Page
app.get('/', (req, res) => {
    res.render('landingPage/index');
});

//Main Application Job Order Management System
app.use('/job-orders', jobOrderRoutes);

app.use((req, res) => {
    res.status(404).send('Opps! 404 - Page Not Found'); //temporary handler
});



