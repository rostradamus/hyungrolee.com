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

UserSchema.methods.verifyPassword = function(candidatePassword, cb) {
    return this.password === candidatePassword;
};

mongoose.model('User', UserSchema);