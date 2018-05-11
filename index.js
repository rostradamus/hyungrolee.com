const CONFIG = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');

// Models
require('./models/Post');
require('./models/User');

// DATABASE PROXY to check go on mlab.com
const options = {
  user: CONFIG.mongoUser.user,
  pass: CONFIG.mongoUser.password
};
mongoose.Promise = global.Promise;
mongoose.connect(CONFIG.mongoURI, options);

const app = express();
app.use(morgan('dev'));
app.use(
  cookieSession({
    maxAge: 1 * 1 * 60 * 60 * 1000,
    keys: [CONFIG.cookieKey]
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/client/build`));

require('./routes/post')(app);
require('./routes/auth')(app);

app.listen(5000);