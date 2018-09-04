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
  app.post("/api/post/:postId/comment",
    _hasLoggedIn,
    (req, res) => {
      const comment = new Comment({
        postId: "5b67b64a8ccedb9ac7c8b8d2",
        authorId: "5a935603e5f81f9238477579",
        author: "Ro Lee",
        content: "Hello this is first comment"
      });
      // const comment = new Comment(Object.assign, req.body, { authorId: req.user._id });
      comment.save((err, target) => {
        if (err) res.send(err);
        res.status(200);
        res.send(target);
      });
  });

  app.get("/api/post/:postId/comment",
    (req, res) => {
      const order = { time: -1 };
      const postId = req.params.postId;
      Post.findById({ postId }, (err, post) => {
        Comment.find({ postId }).sort(order).exec((err, comments) => {
          if (err) res.send(err);
          res.status(200);
          res.send(comments);
        });
      });
  });

  app.get("/api/post/:postId/comment/:commentId",
    (req, res) => {

  });

  app.delete("/api/post/:postId/comment/:commentId",
    _hasLoggedIn,
    (req, res) => {

  });
}