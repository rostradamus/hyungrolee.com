const CONFIG = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');

// DATABASE PROXY to check go on mlab.com
const options = {
  user: process.env.PBLOG_DB_USERNAME,
  pass: process.env.PBLOG_DB_PASSWORD
};
mongoose.Promise = global.Promise;
mongoose.connect(process.env.PBLOG_DB_URI, options);

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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  })
})

app.listen(5000);
