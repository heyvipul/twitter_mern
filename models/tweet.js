
const mongoose = require("mongoose")

const tweetSchema = new mongoose.Schema({
    title: {type: String, required: true },
    body: {type: String, required: true },
    category: {type: String, enum: ['education', 'development', 'fun', 'sports'], required: true },
});

const Tweet = mongoose.model("tweet",tweetSchema)

module.exports = Tweet