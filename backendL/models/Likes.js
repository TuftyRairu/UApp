const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    itemid: { type: mongoose.Schema.Types.ObjectId, ref: 'UserItem' },
    userid: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Likes', likesSchema);