const routes = require("express").Router();

const Note = require("mongoose").model("Note");

routes.get("/", async (req, res) => {
  try {
    const note = await Note.findOne().populate({ path: "author" }).exec();
    if (!note) {
      return res.sendStatus(404);
    }
    res.status(200);
    return res.send(note);
  } catch (e) {
    return res.status(500).json(e)
  }
});

routes.post("/", async (req, res) => {
  try {
    const author = req.user._id;
    const note = new Note({...req.body, author});
    const saved = await (await note.save()).populate("author").execPopulate();
    res.status(200);
    res.send(saved);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = routes;
