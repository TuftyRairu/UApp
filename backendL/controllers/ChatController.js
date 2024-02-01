const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');
const Message = require('../models/Message');

exports.enterChatRoom = async (req, res) => {
    try {
        const exist = await ChatRoom.find({"users.0": req.body.users});

        // if(exist) {
        //     return res.status(400).json({ success: "false", message: "User Existed!" });
        // }

        const mes = await Message.find({})

        const room = await ChatRoom.find({_id: mes.room_id}).populate('messages');

        const chatRoom = await ChatRoom.create({...req.body, messages: null});

        res.status(500).json({ success: "true", message: "Successfully Added!", chatRoom });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.messages = async (req, res) => {
    try {
        const { room_id, userid, message } = req.body;

        const name = await User.findOne({_id: userid })
        const username = name.firstname + " " + name.lastname;

        const messages = await Message.create({
            room_id,
            userid,
            username,
            message
        })

        const room = await ChatRoom.findOneAndUpdate({_id: room_id}, {
            messages: messages
        })

        res.status(200).json({ success: "true", message: "Message Added!", messages, room });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}