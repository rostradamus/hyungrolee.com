const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    token: String
}, { collection: 'User' });

mongoose.model('User', userSchema);