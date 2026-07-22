const mongoose = require('mongoose');
require('dotenv').config();


const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/devnote";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = connectToMongo;