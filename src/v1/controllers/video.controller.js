const BaseController = require("../../base/base.controller");
const { ModelName } = require("../../config/constant.config");
const VideoService = require("../services/video.service");

class VideoController extends BaseController {
  name = ModelName.videos;
  service = new VideoService();

  constructor() {
    super();

    this.defaultRouter();
  }
}

module.exports = VideoController;
