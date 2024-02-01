const mongoose = require("mongoose");

mongoose.connect(process.env.DB);

mongoose.connection.on("connected", () => {
    console.log("Connected to database successfully!");
});

mongoose.connection.on("error", () => {
    console.log("Error while connecting to database!");
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongodb connection disconnected!");
});