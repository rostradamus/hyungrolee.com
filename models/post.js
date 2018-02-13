const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    twitterToken: String,
    twitterTokenSecret: String,
    instaToken: String,
    instaId: String
});


mongoose.model('post', postSchema);