const mongoose = require('mongoose');
const messageSchema = require('../models/Message');

const message = mongoose.model('Message')

const validator = userid => userid.length <= 2;

const custom = [validator, "User don't have the access to this!"];

const chatRoomSchema = new mongoose.Schema({
    users: {
        type: Array,
        validate: custom
    },
    room_name: {
        type: String,
        required: true
    },
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, { versionKey: false })

module.exports = mongoose.model('ChatRoom', chatRoomSchema);