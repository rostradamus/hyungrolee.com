const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  postId: String,  
  authorId: String,
  author: String,
  time: { type : Date, default: Date.now },
  content: String
}, { collection: 'Comment' });

mongoose.model('Comment', CommentSchema);