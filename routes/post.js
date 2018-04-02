const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports = app => {

  app.get('/api/post', (req, res) => {
    let order = { time: -1 };
    Post.find({}).sort(order).exec((err, posts) => {
        if (err) res.send(err);
        res.status(200);
        res.send(posts);
      });
  });

  app.get('/api/post/:id', (req, res) => {
    Post.find({_id: req.params.id}, (err, post) => {
      if (err) res.send(err);
      res.status(200);
      res.send(post);
    });
  });

  app.post('/api/post/new', (req, res) => {
      const post = new Post(req.body);
      post.save((err, target) => {
          if (err) res.send(err);
          res.status(200);
          res.send(target);
      });
  });
};