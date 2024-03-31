const BaseController = require("../../base/base.controller");
const VideoService = require("../services/video.service");

class VideoController extends BaseController {
  service = new VideoService();
}

module.exports = VideoController;
