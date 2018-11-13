const routes = require('express').Router();

// Serve API controller
routes.use("/user/", require('./authController'));
routes.use("/posts/", require('./postController'));

module.exports = routes;
