const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    token: String
}, { collection: 'User' });

UserSchema.methods.verifyPassword = function(candidatePassword, cb) {
    return this.password === candidatePassword;
};

mongoose.model('User', UserSchema);