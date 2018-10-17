const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  postId: {
  	type: Schema.Types.ObjectId,
  	ref: "Post"
  },
  author: {
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  },
  time: { type : Date, default: Date.now },
  content: String,
  isHidden: Boolean
}, { collection: 'Comment' });

mongoose.model('Comment', CommentSchema);