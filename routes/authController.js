const routes = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
require('../models/User');
const User = mongoose.model('User');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) =>
  User.findById(id)
    .then(user => done(null, { _id: user._id, userName: user.userName }))
    .catch(err => done(err, null, { message: "User does NOT exist"})));

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
      user.verifyPassword(password)
        .then(valid => {
          if (!valid) return done(null, false);
          const { _id, userName } = user;
          return done(null, { _id, userName });
        })
        .catch(err => {
          return done(null, false);
        });
    });
  })
);
routes.post('/', passport.authenticate('local'), (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  // res.redirect('/');

  res.send(req.user);
});

routes.post('/register', (req, res) => {
  const oUser = new User(req.body);
  oUser.save((err, target) => {
        if (err) {
          res.status(401);
          errmsg = "You have entered an email that already exists."
          return res.send({ errmsg });
        }
        req.login(oUser, err => {
          if (err) {
            res.status(500);
            errmsg = "Oh oh, something went wrong. Please try to login again."
            return res.send({ errmsg });
          }
          res.status(200);
          res.send(target);
        });
    });
});

routes.get('/current_user', (req ,res) => {
  if (!req.user) {
    // res.status(401);
    res.redirect(401,'/login');
  } else {
    res.status(200);
    res.send(req.user);
  }

});

routes.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// TODO: Password Encryption is required (See bcrypt)
module.exports = routes;
