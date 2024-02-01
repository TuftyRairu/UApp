const express = require('express');
const router = express.Router();
const { email, deleteOtp, getOtp } = require('../controllers/OtpController');

router.post('/api/otp', email);
router.post('/api/otp/get', getOtp);
router.delete('/api/otp', deleteOtp);

module.exports = router;