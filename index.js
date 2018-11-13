const CONFIG = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');

// DATABASE PROXY to check go on mlab.com
const db = {
  user: process.env.PBLOG_DB_USERNAME,
  pass: process.env.PBLOG_DB_PASSWORD,
  uri: process.env.PBLOG_DB_URI
};
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${db.user}:${db.pass}@${db.uri}`, {
  useCreateIndex: true,
  useNewUrlParser: true
});

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
app.disable('etag');

// Import Models
require('./models/User');
require('./models/Comment');
require('./models/Post');

// Import Rest Controllers
// require('./routes/authController')(app);
// require('./routes/commentController')(app);
// require('./routes/postController')(app);
// const authController= require('./routes/authController');
// app.use("/api/user", authController);
// const postController = require('./routes/postController');
// app.use("/api/posts/", postController);
// const commentController = require('./routes/commentController');
// app.use("/api/comments", commentController);

const routes = require('./routes');
app.use("/api", routes);

// Serve application level controller
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  })
});

app.listen(5000);
