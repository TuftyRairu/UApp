const User = require('../models/User');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, mobilenumber, email, password } = req.body;

        if(!(firstname && lastname && mobilenumber && email && password)) {
            return res.status(400).json({ success: "false", message: "Input Are Required!" });
        }

        const oldEmail = await User.findOne({ email });

        if(oldEmail) {
            return res.status(409).json({ success: "false", message: "Email Already Exists!" });
        }

        const user = await User.create({
            firstname,
            lastname,
            mobilenumber,
            email: email.toLowerCase(),
            password,
            image_url: ""
        });

        res.status(201).json({ success: "true", message: "User Created Successfully!", user: user });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!(email && password)) {
            return res.status(400).json({ success: "false", message: "Input Are Required!" })
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ success: "false", message: "User Does Not Exists!" });
        }

        if(password != user.password) {
            return res.status(400).json({ success: "false", message: "Wrong Password!" });
        }

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.USER_TOKEN_KEY,
            {
                expiresIn: '1hr'
            }
        );

        res.status(200).json({ success: "true", message: "User Logged In Successfully!", user: user, token: token });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.uploadImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageurl, firstname, lastname } = req.body;

        if (!(firstname && lastname)) {
            return res.status(400).json({ success: "false", message: "Input is required!" });
        }

        if(!(id)) {
            return res.status(400).json({ success: "false", message: "An ID is required!" });
        }
        
        if (!(imageurl)){
            const user = await User.findOneAndUpdate({_id: id}, {
                firstname: firstname,
                lastname: lastname
            });

            return res.status(200).json({ success: "true", message: "Change Successfully!!", user: user });
        } else {
            const user = await User.findOneAndUpdate({_id: id}, {
                image_url: imageurl,
                firstname: firstname,
                lastname: lastname
            });
            if (!(user)){
                return res.status(400).json({ success: "false", message: "User does not exist!" });
            }


            return res.status(200).json({ success: "true", message: "Change Successfully!!", user: user });
        }

    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.self = async (req, res) => {
    try {
        const { id } = req.params;

        if(!(id)) {
            return res.status(400).json({ success: "false", message: "ID Unknown" });
        }

        const oldID = await User.findOne({_id: id});

        if(!oldID) {
            return res.status(400).json({ success: "false", message: "ID Does Not Exists!" });
        }

        const user = await User.find({_id: id});

        res.status(200).json({ success: "true", message: "User Profile Selected!", user });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if(!(id)) {
            return res.status(400).json({ success: "false", message: "ID Unknown" });
        }

        if(!(password)) {
            return res.status(400).json({ success: "false", message: "Password is Empty!" });
        }

        const oldID = await User.findOne({_id: id});

        if(!oldID) {
            return res.status(400).json({ success: "false", message: "ID Does Not Exists!" });
        }

        await User.findByIdAndUpdate({_id: id}, {
            password
        })

        const user = await User.findOne({_id: id});

        res.status(200).json({ success: "true", message: "Password Has Been Changed Successfully!", user: user });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message});
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await User.findOne({_id: id});

        res.status(200).json({ success: "true", message: "List of Users", user });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.allUsers = async (req, res) => {
    try {
        const user = await User.find({});

        res.status(200).json({ success: "true", message: "List of Users", user });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if(!(id)) {
            return res.status(400).json({ success: "false", message: "ID Unknown" });
        }

        const oldID = await User.findOne({_id: id});

        if(!oldID) {
            return res.status(400).json({ success: "false", message: "ID Does Not Exists!" });
        }

        const user = await User.deleteOne({_id: id});

        res.status(200).json({ success: "true", message: "User Successfully Deleted", user: user });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, password } = req.body;

        if(!(id)) {
            return res.status(400).json({ success: "false", message: "ID Unknown" });
        }

        if(!(firstname && lastname && email && password)) {
            return res.status(400).json({ success: "false", message: "Input Are Required!" });
        }

        const oldID = await User.findOne({_id: id});

        if(!oldID) {
            return res.status(409).json({ success: "false", message: "ID Does Not Exists!" });
        }

        if(oldID.firstname === firstname && oldID.lastname === lastname && oldID.email === email && oldID.password === password) {
            return res.status(409).json({ success: "false", message: "Input Is The Same!", user: {firstname, lastname, email, password} });
        }

        await User.findByIdAndUpdate({_id: id}, {
            firstname,
            lastname,
            email: email.toLowerCase(),
            password
        })

        const user = await User.findOne({_id: id});

        res.status(200).json({ success: "true", message: "User Updated Successfully!" , user: user});
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}