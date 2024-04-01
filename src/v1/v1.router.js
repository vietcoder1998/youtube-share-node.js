const { Router } = require("express");
const { ModelName, ModelPath } = require("../config/constant.config");
const v1Router = Router();
const UserController = require("./controllers/user.controller");
const VideoController = require("./controllers/video.controller");
const AuthenticateController = require("./controllers/authenticate.controller");
const mongoose = require("mongoose");

const userController = new UserController();
const videoController = new VideoController();
const authenticateController = new AuthenticateController();

mongoose
  .connect(process.env.NODE_MONGO_DB_PATH, {
    dbName: process.env.NODE_MONGO_DB_COLLECTION
  })
  .then(() => {
    console.info("Connected to Mongoose");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

v1Router
  .use(`/${ModelPath.user}`, userController.router)
  .use(`/${ModelPath.video}`, videoController.router)
  .use(`/${ModelPath.authenticate}`, authenticateController.router);

module.exports = v1Router;
