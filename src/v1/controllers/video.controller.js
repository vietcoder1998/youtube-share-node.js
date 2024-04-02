const BaseController = require("../../base/base.controller");
const { ModelName } = require("../../config/constant.config");
const VideoService = require("../services/video.service");

class VideoController extends BaseController {
  name = ModelName.videos;
  service = new VideoService();
  io = {};

  constructor(io) {
    super(io);

    if (io) {
      this.io = io;
    }

    this.router
      .post("/:id/like", this.like.bind(this))
      .post("/:id/dislike", this.dislike.bind(this));
    this.defaultRouter();
  }

  async create(request, response) {
    try {
      const body = request.body ?? {};
      const userId = request.headers["funny-movie-user-id"];
      const detail = await this.service.create(body, userId);
      this.io.emit("newVideo", detail);

      this.baseResponse.sendDataList(response, detail);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async getList(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const dataList = await this.service.getList(query);

      this.baseResponse.sendDataList(response, dataList);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async dislike(request, response) {
    try {
      const videoId = request?.params.id;
      const userId = request?.headers["funny-movie-user-id"];
      const dataList = await this.service.onDislikeVideo(videoId, userId);

      this.baseResponse.sendDetail(response, dataList);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async like(request, response) {
    try {
      const videoId = request?.params.id;
      const userId = request?.headers["funny-movie-user-id"];
      const dataList = await this.service.onLikeVideo(videoId, userId);

      this.baseResponse.sendDetail(response, dataList);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }
}

module.exports = VideoController;
