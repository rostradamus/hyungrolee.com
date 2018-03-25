const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports = app => {

  app.get('/api/posts', (req, res) => {
    let order = { time: -1 };
    Post.find({}).sort(order).exec((err, posts) => {
        if (err) res.send(err);
        res.send(posts);
      });
  });

  app.post('/api/posts/new', (req, res) => {
      const post = new Post(req.body);
      post.save((err, target) => {
          if (err) res.send(err);
          res.send(target);
      });
  });
};