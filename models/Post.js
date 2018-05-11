const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    author: String,
    title: String,
    time: { type : Date, default: Date.now },
    content: String,
    attachment: String
}, { collection: 'Post' });

mongoose.model('Post', PostSchema);