const express = require('express');
const router = express.Router();
const Messages = require('../models/messagesModel')

router.get('/', (req, res) =>{
    Messages.find({}).then(result => result.json()).then(data => res.send(data));
});

router.post('/', (req, res) =>{
    const data = {
        name: req.body.name,
        contact: req.body.contact,
        message: req.body.message
    }
    
    let newMassage = new Messages(data);
    newMassage.save().then(result => {
        res.status(200).render('landingPage/messageSent', {title: "Message Sent Successfully!"});
    });
});


module.exports = router;