const routes = require("express").Router();
const Diary = require("mongoose").model("Diary");

routes.get("/", (req, res) => {
  const order = { created_at: -1 };
  Diary.find(req.query)
    .populate({ path: "author" })
    .sort(order)
    .exec((err, diaries) => {
    if (err) return res.status(500).json(err);
    res.status(200);
    res.send(diaries);
  });
});

routes.get("/:id", (req, res) => {
  Diary.findById(req.params.id)
    .populate({ path: "author" })
    .exec((err, diary) => {
      if (err) return res.status(500).json(err);
      res.status(200);
      res.send(diary);
    });
});

routes.post("/", (req, res) => {
  const author = req.user._id;
  const diary = new Diary({...req.body, author });
  diary.save((err, target) => {
    if(err) return res.status(500).json(err);
    res.status(200);
    res.send(target);
  });
});

module.exports = routes;
