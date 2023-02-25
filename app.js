require('dotenv').config(); //for virtual env
const express = require('express');
const morgan = require('morgan'); //for developer logs
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

//external routes
const jobOrderRoutes = require('./routes/jobOrderRoutes');

//create app
const app = express();

//db connection
const dbURI = process.env.DB_URI;
mongoose.set('strictQuery', true); //for deprecation warnings
mongoose.connect(dbURI)
    .then(result => {
        console.log('connected to db');
        //development mode
        app.listen(process.env.PORT || 3000, () => console.log(`Server Started listening to http://localhost:${process.env.PORT} ... \n\nCONSOLE LOGS:`));
    })
    .catch(err => console.log(err));

//set view engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public')); 
app.use(morgan('dev')); //used as dev tool
app.use(express.json());//used for flash message
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); //used for flash message
app.use(session({
    name: 'cdls', //comtech dashboard login session
    secret: 'FI652bnTDOuqt9Vaiqfn',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false,
})); //used for flash message and authenticaiton
app.use(flash()); //used for flash message

//Basic Auth Middleware
function isAuth(req, res, next) {

    if (req.session && req.session.user === process.env.ADMIN_USER && req.session.admin) {
      next();
    } else {
      res.redirect('/login');
    }
}


            //ROUTES//

//Login endpoint
app.get('/login', (req, res) => {

    res.render('jobOrder/job-login',{title: "Login", flashMessage: req.flash('message')});

});

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password){
        req.flash('message', 'Fill in your credentials.')
        res.redirect('/login');
    } else if(req.body.username === process.env.ADMIN_USER && req.body.password === process.env.ADMIN_PASSWORD){
        req.session.user = process.env.ADMIN_USER;
        req.session.admin = true;
        res.redirect('/job-orders');
    } else {
        req.flash('message', 'Username or password is incorrect.')
        res.redirect('/login');
    }
});

//Logout Endpoint
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('logged out successfully... <a href="/">Go back</a>')
});


//Landing Page
app.get('/', (req, res) => {
    res.render('landingPage/index');
});

//Main Application Job Order Management System
app.use('/job-orders',isAuth, jobOrderRoutes);
// app.use('/job-orders', jobOrderRoutes);

app.use((req, res) => {
    res.status(404).send('<h1><strong>Opps! 404 - Page Not Found <br><br> -CLRK </strong></h1>'); //temporary handler
});




