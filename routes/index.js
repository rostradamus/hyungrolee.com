const routes = require('express').Router();

// Serve API controller
routes.use("/api/user", require('./authController'));
routes.use("/api/posts/", require('./postController'));

// Serve application level controller
routes.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  })
});

module.exports = routes;
