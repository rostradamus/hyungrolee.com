const mongoose = require('mongoose');
const { Schema } = mongoose;
let currentUser;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    token: String
}, { collection: 'User' });


mongoose.model('User', userSchema);