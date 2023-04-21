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

    isRead: {
        type: Boolean,
        default: false
    },

    isReplied: {
        type: Boolean,
        default: false
    }


}, {timestamps: true});

const Messages = mongoose.model('Message', messages);
module.exports = Messages;
