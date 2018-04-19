const passport = require('passport');
const mongoose = require('mongoose');
let LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id)
  .then(user => done(null, { _id: user._id, username: user.username })));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.verifyPassword(password)) { return done(null, false); }
      const { _id, username } = user;
      return done(null, { _id, username });
    });
  })
);

// TODO: Password Encryption is required (See bcrypt)
module.exports = app => {

  app.post('/api/user/authenticate',
    passport.authenticate('local'),
    (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        // res.redirect('/');
        res.send(req.user);
      });

  app.get('/api/user/current_user', (req,res) => {
    if (!req.user) {
      res.status(401);
    }
    res.send(req.user);
  });

  app.get('/api/user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};