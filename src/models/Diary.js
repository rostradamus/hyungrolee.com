const mongoose = require('mongoose');
const { Schema } = mongoose;

const DiarySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  start: Date,
  end: Date,
  created_at: { type : Date, default: Date.now },
  content: String
}, { collection: 'Diary' });

module.exports = mongoose.model('Diary', DiarySchema);
