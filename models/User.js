const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: { type: String, index: { unique: true } },
    password: String,
    token: String
}, { collection: 'User' });

UserSchema.plugin(require('mongoose-bcrypt'));

mongoose.model('User', UserSchema);