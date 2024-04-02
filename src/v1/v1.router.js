const { Router } = require("express");
const { ModelName, ModelPath } = require("../config/constant.config");
const UserController = require("./controllers/user.controller");
const VideoController = require("./controllers/video.controller");
const AuthenticateController = require("./controllers/authenticate.controller");
const mongoose = require("mongoose");

class ApplicationRouter {
  router = Router();
  io = {}
  constructor(io) {
    if (io) {
      this.io = io
    }

    mongoose
      .connect(process.env.NODE_MONGO_DB_PATH, {
        dbName: process.env.NODE_MONGO_DB_COLLECTION,
      })
      .then(() => {
        console.info("Connected to Mongoose");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });

    this.startRouter();
  }

  startRouter() {
    const userController = new UserController(this.io);
    const videoController = new VideoController(this.io);
    const authenticateController = new AuthenticateController(this.io);

    this.router
      .use(`/${ModelPath.user}`, userController.router)
      .use(`/${ModelPath.video}`, videoController.router)
      .use(`/${ModelPath.authenticate}`, authenticateController.router);
  }
}

module.exports = ApplicationRouter;
