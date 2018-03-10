const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports = app => {

    app.get('/posts', (req, res) => {
        Post.find({}, (err, posts) => {
            if (err) res.send(err);
            res.send(posts);
        });
    });

    app.get('/posts/insert', (req, res) => {
        let sample = new Post({
            author: 'Ro Lee',
            title: 'Sample Post',
            content: 'Sample Content',
            attachment: 'empty'
        });
        sample.save((err, target) => {
            if (err) res.send(err);
            res.send(target);
        });
    });
};