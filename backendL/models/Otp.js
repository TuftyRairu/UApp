const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    }
}, { versionKey: false })

module.exports = mongoose.model('Otp', otpSchema);