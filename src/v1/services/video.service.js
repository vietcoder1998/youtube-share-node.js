const BaseService = require("../../base/base.service");
const VideoModel = require("../models/video.model");

class VideoService extends BaseService {
  model = VideoModel;
}

module.exports = VideoService;
