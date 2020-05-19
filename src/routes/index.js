const routes = require("express").Router();

// Serve API controller
routes.use("/posts/", require("./postController"));
routes.use("/user/session/", require("./sessionController"));
routes.use("/users/", require("./userController"));
routes.use("/diaries/", require("./diaryController"));
routes.use("/note/", require("./noteController"));

module.exports = routes;
