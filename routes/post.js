const mongoose = require('mongoose');
require('../models/Post');
const Post = mongoose.model('Post');

const _hasLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = app => {

  app.get('/api/post', _hasLoggedIn, (req, res) => {
    const order = { time: -1 };

    Post.find({}).sort(order).exec((err, posts) => {
        if (err) res.send(err);
        res.status(200);
        res.send(posts);
      });
  });

  app.get('/api/post/:id', _hasLoggedIn, (req, res) => {
    Post.find({_id: req.params.id}, (err, post) => {
      if (err) res.send(err);
      res.status(200);
      res.send(post);
    });
  });

  app.post('/api/post/new', _hasLoggedIn, (req, res) => {
      const post = new Post(req.body);
      post.save((err, target) => {
          if (err) res.send(err);
          res.status(200);
          res.send(target);
      });
  });
};