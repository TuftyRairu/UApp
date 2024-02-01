const express = require('express');
require('dotenv').config();
require('./config/db');
const userRouter = require('./routes/User');
const otpRouter = require('./routes/Otp');
const chatRouter = require('./routes/Chat');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter);
app.use(otpRouter);
app.use(chatRouter);


app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to Hydr8now's Backend side!"
    })
})

const port = process.env.PORT || 8000;
app.listen(port, '192.168.68.139');