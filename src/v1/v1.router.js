const { Router } = require("express");
const { ModelName, ModelPath } = require("../config/constant.config");
const v1Router = Router();
const UserController = require("./controllers/user.controller");
const VideoController = require("./controllers/video.controller");

const userController = new UserController();
const videoController = new VideoController();

v1Router.use(`/${ModelPath.user}`, userController.router);
v1Router.use(`/${ModelPath.video}`, videoController.router);

module.exports = v1Router;
