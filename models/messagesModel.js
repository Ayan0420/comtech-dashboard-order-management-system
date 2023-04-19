const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messages = new Schema({
    name: {
        type: String,
        default: "Anonymous"
    },

    contact: {
        type: String,
        default: "Anonymous"
    },

    message: {
        type: String,
        default: "No message"
    },

    read: {
        type: Boolean,
        default: false
    }


}, {timestamps: true});

const Messages = mongoose.Model('Message', messages);
module.exports = Messages;
