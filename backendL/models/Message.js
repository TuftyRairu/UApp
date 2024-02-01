const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { versionKey: false })

module.exports = mongoose.model('Message', messageSchema);