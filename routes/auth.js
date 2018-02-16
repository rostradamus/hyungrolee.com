const passport = require('passport');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports = app => {

    app.post(
        '/login',
        passport.authenticate('local'),
        (req, res) => {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.redirect('/');
        });
    
}