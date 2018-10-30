const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

const _hasLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = app => {
  app.post("/api/posts/:post_id/comment",
    _hasLoggedIn,
    (req, res) => {
      const { author, content } = req.body,
        post = req.params.post_id;
      const comment = new Comment({ post, author, content });
      // const comment = new Comment(Object.assign, req.body, { authorId: req.user._id });
      comment.save((err, target) => {
        if (err) res.send(err);
        res.status(200);
        res.send(target);
      });
  });

  app.get("/api/posts/:post_id/comment",
    (req, res) => {
      const order = { created_at: -1 };
      const post = req.params.post_id;
      Comment.find({ post })
        .populate({ path: "author", select: "userName-_id" })
        .sort(order)
        .exec((err, comments) => {
          if (err) res.send(err);
          res.status(200);
          res.send(comments);
        });
  });

  app.get("/api/posts/:post_id/comment/:commentId",
    (req, res) => {

  });

  app.delete("/api/posts/:post_id/comment/:commentId",
    _hasLoggedIn,
    (req, res) => {

  });
}