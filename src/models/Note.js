const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: String,
  updated_at: { type: Date, default: Date.now }
}, { collection: "Note" })

NoteSchema.pre("save", function (next) {
  const now = Date.now();

  this.updatedAt = now;

  next();
});

module.exports = mongoose.model("Note", NoteSchema);
