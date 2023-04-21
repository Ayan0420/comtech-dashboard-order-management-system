const express = require('express');
const router = express.Router();
const Messages = require('../models/messagesModel')
const moment = require('moment')

function isAuth(req, res, next) {

    if (req.session && req.session.user === process.env.ADMIN_USER && req.session.admin) {
      next();
    } else {
      res.send({
        response: false,  
        error: 'access denied'
    });
    }
}

// add this later "isAuth, "

router.get('/', (req, res) =>{
    Messages.find({}).sort({createdAt: -1}).then(data => {

       res.send(data.map(item => { 
        return {
            id: item._id,
            name: item.name,
            contact: item.contact,
            message: item.message,
            isRead: item.isRead,
            isReplied: item.isReplied,
            createdAt: moment(item.createdAt).format("MMMM Do, YYYY, h:mma"),
            createdFromNow: moment(item.createdAt).fromNow()
        }
        }));
    });
});

router.post('/', (req, res) =>{
    const data = {
        name: req.body.name,
        contact: req.body.contact,
        message: req.body.message
    }
    let newMassage = new Messages(data);
    newMassage.save().then(result => res.status(200).render('landingPage/messageSent', {title: "Message Sent Successfully!"}));
});

router.post('/mark-all-as-read', (req, res) => {
    if(req.body.isReadAll === true){
        Messages.updateMany({isRead: false}, {isRead: true}).then(data => {
            res.send({response: true});
        });
    }
});

router.post('/mark-as-read', (req, res) => {
    Messages.findByIdAndUpdate({_id: req.body.id}, {isRead: true}).then(data => {
        res.send({response: true});
    });
});

router.post('/mark-as-unread', (req, res) => {
    Messages.findByIdAndUpdate({_id: req.body.id}, {isRead: false}).then(data => {
        res.send({response: true});
    });
});

router.post('/mark-all-as-replied', (req, res) => {
    if(req.body.isRepliedAll === true){
        Messages.updateMany({isReplied: false}, {isReplied: true}).then(data => {
            res.send({response: true});
        });
    }
});

router.post('/mark-as-replied', (req, res) => {
    Messages.findByIdAndUpdate({_id: req.body.id}, {isReplied: true}).then(data => {
  
        res.send({response: true});
    });
})

router.post('/mark-as-notreplied', (req, res) => {
    Messages.findByIdAndUpdate({_id: req.body.id}, {isReplied: false}).then(data => {

        res.send({response: true});
    });
})

router.delete('/delete', (req, res) => {
    Messages.findByIdAndDelete(req.body.id).then(data => {
        res.send({response: true});
    });
});

module.exports = router;