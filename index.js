const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
// const twitter = require('./services/twitterClient');
// Models
// require('./models/User');

// DATABASE PROXY to check go on mlab.com
// mongoose.connect(keys.mongoURI);

const app = express();
app.use(morgan('dev'));
// app.use(
//     cookieSession({
//         maxAge: 1 * 1 * 60 * 60 * 1000,
//         keys: [keys.cookieKey]
//     })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize());
app.use(passport.session());

require('./routes/posts')(app);

app.listen(5000);





