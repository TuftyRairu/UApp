const Otp = require('../models/Otp');
const nodemailer = require('nodemailer');

exports.deleteOtp = async (req, res) => {
    try {
        await Otp.deleteMany({});

        res.status(200).json({ success: "true" });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.getOtp = async (req, res) => {
    try {
        const { number } = req.body;
        const num = await Otp.findOne({number: number});

        if(!num) {
            return res.status(400).json({ success: "false", message: "OTP Code Does Not Exist!" });
        }

        res.status(200).json({ success: "true", number: num });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.email = async (req, res) => {
    try {
        const { email } = req.body;
        const randomnum = Math.floor(100000 + Math.random() * 900000);

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "craususrhyle@gmail.com", // generated brevo user
              pass: "7SvbapxHYz0Z2cNE", // generated brevo password
            },
        });
    
        const info = await transporter.sendMail({
        from: '"lostandfoundapp@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: "Reset Password OTP Code", // Subject line
        text: `Reset Password OTP Code is ${randomnum}`, // plain text body
        html: `Reset Password OTP Code is ${randomnum}`,
        });

        const otp = await Otp.create({
            number: randomnum
        });

        res.status(200).json({ success: "true", info: info.envelope, otp: otp });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}