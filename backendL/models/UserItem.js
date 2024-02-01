const mongoose = require('mongoose');

const userItemSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['LOST', 'FOUND'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    daylost: {
        type: String,
        required: true
    },
    likes: {
        type: Number
    },
    image_url: {
        type: String
    },
    user_image: {
        type: String
    },
    uploadedAt : { type : Date, default: Date }
}, { versionKey: false });

module.exports = mongoose.model('UserItem', userItemSchema);