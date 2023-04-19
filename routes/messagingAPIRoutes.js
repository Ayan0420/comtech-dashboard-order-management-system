const express = require('express');
const router = express.Router();
const Messages = require('../models/messagesModel')

app.get('/', (req, res) =>{
    Messages.find({}).then(result => result.json()).then(data => res.send(data));
});

app.post('/', (req, res) =>{
    const data = {
        name: req.body.name,
        contact: req.body.contact,
        messages: req.body.messages
    }
    
    let newMassage = new Messages(data);
    newMassage.save().then(result => {
        res.send({
            response: true,
            message: 'Message successfully sent!'
        })
    });
});


module.exports = router;