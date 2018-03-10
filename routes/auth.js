const passport = require('passport');
const mongoose = require('mongoose');
let LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, { _id: user._id })));

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!verifyPassword(password, user)) { return done(null, false); }
            const _id = user._id;
            return done(null, { _id });

            function verifyPassword(password, user) {
                return user.password === password;
            }
        });
    }
));

// TODO: Password Encryption is required (See bcrypt)
module.exports = app => {

    app.post(
        '/users/authenticate',
        passport.authenticate('local'),
        (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        // res.redirect('/');
            res.send(req.user);
        });

    app.get('/users/current_user', (req,res) => {
        if (!req.user) {
            res.status(401);
        }
        res.send(req.user);
    });

    app.get('/users/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};