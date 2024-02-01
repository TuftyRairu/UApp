const userItem = require('../models/UserItem');
const User = require('../models/User');
const Likes = require('../models/Likes');

exports.addItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, imageurl, daylost } = req.body;

        if(!(id && name && description)) {
            return res.status(400).json({ success: "false", message: "Input Should Not Be Empty!" });
        }
        
        const user = await User.findOne({_id: id});

        const user_image = user.image_url;

        const types = "LOST";

        const username = user.firstname + " " + user.lastname;

        const number = user.mobilenumber;
        
        const item = await userItem.create({
            userid: id,
            username: username,
            mobilenumber: number,
            name,
            type: types,
            description,
            daylost,
            likes: 0,
            image_url: imageurl,
            user_image,
            uploadedAt: Date.now()
        });

        res.status(201).json({ success: "true", message: "Item Added Successfully!", item: item });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.foundItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemid } = req.body;

        if(!(id)) {
            return res.status(400).json({ success: "false", message: "ID is unknown!" });
        }

        const itype = await userItem.findOne({userid:id});

        if(itype) {
            const mytype = await userItem.findOne({_id:itemid});
            if (mytype.type === "LOST") {
                const types = "FOUND";

                await userItem.findOneAndUpdate({_id:itemid},{
                    type: types
                });
            } else if(mytype.type === "FOUND") {
                return res.status(400).json({ success: "false", message: "Item have been found already!" });
            }
        } else {
            return res.status(400).json({ success: "false", message: "User does not Exists!" });
        }

        const user = await userItem.findOne({userid:id});

        res.status(200).json({ success: "true", message: "Item Type Changed Successfully!", item: user });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemid } = req.body;

        if(!(itemid && id)) {
            return res.status(400).json({ success: "false", message: "ID's Unknown!" });
        }

        const useritem = await userItem.findOne({ userid: id });

        if(!useritem) {
            return res.status(400).json({ success: "false", message: "User's ID does not Exists!" });
        }

        const item = await userItem.findOne({ _id: itemid});

        if(!item) {
            return res.status(400).json({ success: "false", message: "Item Does Not Exist!" });
        }

        const user = await userItem.deleteOne({ _id: itemid });

        res.status(200).json({ success: "true", message: "Item Successfully Deleted!", item: user });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.getAllUserLostItems = async (req, res) => {
    try {
        const items = await userItem.find({type: 'LOST'});

        if (items != null) {
            return res.status(200).json({ success: "true", message: "Lost Item List", items });
        } else {
            return res.status(400).json({ success: "false", message: "You don't have a Lost items!"  });
        }
        
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.getAllUserFoundItems = async (req, res) => {
    try {
        const items = await userItem.find({type: 'FOUND'});

        if (items != null) {
            return res.status(200).json({ success: "true", message: "Found Item List", items });
        } else {
            return res.status(400).json({ success: "false", message: "There are no Found Items Yet"  });
        }
        
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.getMyItems = async (req, res) => {
    try {
        const { id } = req.params

        if (!(id)) {
            return res.status(400).json({ success: "false", message: "ID is not valid!" });
        }

        const items = await userItem.find({userid: id});

        res.status(200).json({ success: "true", message: "User's Items", items });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.addLikes = async (req, res) => {
    try {
        const { itemid, id } = req.body

        if (!(itemid && id)) {
            return res.status(400).json({ success: "false", message: "ID is not valid!" });
        }

        const user = await userItem.findOne({_id: itemid});

        const likes = await Likes.findOne({userid: id});

        if (likes) {
            const updatelike = await userItem.findOne({_id: itemid});

            if (updatelike.likes === 1) {
                await Likes.deleteMany({userid: id});
                await userItem.findOneAndUpdate({_id: itemid}, {
                    likes: 0
                })
            } else {
                await Likes.deleteMany({userid: id});
            }
        } else {

            await Likes.create({
                itemid: itemid,
                userid: id
            })

            const query = await Likes.countDocuments();

            await userItem.findOneAndUpdate({_id: itemid}, {
                likes: query
            })
        }
        const items = await userItem.findOne({_id: itemid});

        res.status(200).json({ success: "true", message: "User's Items", items });
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}

exports.getLikes = async (req, res) => {
    try {
        const { id } = req.params;

        if (!(id)) {
            return res.status(400).json({ success: "false", message: "ID is required!" });
        }

        const likes = await Likes.find({userid: id});

        if (likes) {
            return res.status(200).json({ success: "true", liked: "true" });
        }

        res.status(200).json({ success: "false", liked: "false" })
    } catch (error) {
        res.status(500).json({ success: "false", message: error.message });
    }
}