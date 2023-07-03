require('dotenv').config(); //for virtual env
const express = require('express');
const morgan = require('morgan'); //for developer logs
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors')

//external routes
const jobOrderRoutes = require('./routes/jobOrderRoutes');
const trackingAppRoutes = require('./routes/trackingAppRoutes');
const messagingAPIRoutes = require('./routes/messagingAPIRoutes')

//create app
const app = express();

//db connection
const dbURI = process.env.DB_URI;
mongoose.set('strictQuery', true); //for deprecation warnings
mongoose.connect(dbURI)
    .then(result => {
        console.log('connected to db');
        //development mode
        app.listen(process.env.PORT || 4000, () => console.log(`Server Started listening to http://localhost:${process.env.PORT} ... \n\nCONSOLE LOGS:`));
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
    cookie: {maxAge: null},
    resave: false,
    saveUninitialized: false,
})); //used for flash message and authenticaiton
app.use(flash()); //used for flash message
app.use(cors());

//Basic Auth Middleware
function isAuth(req, res, next) {

    if (req.session && req.session.user === process.env.ADMIN_USER && req.session.admin) {
      next();
    } else {
      res.redirect('/d-login');
    }
}

//ROUTES//
app.get('/', (req, res) => {
    res.redirect('/job-orders')
})

//Login endpoint
app.get('/d-login', (req, res) => {
    if (req.session && req.session.user === process.env.ADMIN_USER && req.session.admin) {
        res.redirect('/job-orders');
      } else {
        res.render('jobOrder/job-login',{title: "Login", flashMessage: req.flash('message')});
      }

});

app.post('/d-login', (req, res) => {
    if (!req.body.username || !req.body.password){
        req.flash('message', 'Fill in your credentials.')
        res.redirect('/d-login');
    } else if(req.body.username === process.env.ADMIN_USER && req.body.password === process.env.ADMIN_PASSWORD){
        req.session.user = process.env.ADMIN_USER;
        req.session.admin = true;
        res.redirect('/job-orders');
    } else {
        req.flash('message', 'Username or password is incorrect.')
        res.redirect('/d-login');
    }
});

//Logout Endpoint
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('<h3 style="color: crimson; padding-top: 3rem; text-align: center; font-family: Arial;">Logged out successfully! <br> <a href="/d-login">Login Here</a></h3>')
});

//Main Application Job Order Management System

// app.use('/job-orders',isAuth, jobOrderRoutes); //for production
app.use('/job-orders', jobOrderRoutes); //for development

//Tracking System
app.use('/tracking-app', trackingAppRoutes);

//Simple messaging
app.use('/messaging',  messagingAPIRoutes);

app.use((req, res) => {
    res.status(404).render('landingPage/404', {title: "404"});
});




