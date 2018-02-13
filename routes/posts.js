const passport = require('passport');

module.exports = app => {

    app.get('/posts', (req,res) => {
        const sample = [{
            title: "Sample Post",
            author: "Sample User",
            content: "Sample content"
        }];
        res.send(sample);
    })
}


