const BaseController = require("../../base/base.controller");
const { ModelName } = require("../../config/constant.config");
const VideoService = require("../services/video.service");
const AuthenticateJob = require("../../job/authenticate.job");

class VideoController extends BaseController {
  name = ModelName.videos;
  service = new VideoService();

  constructor() {
    super();

    this.defaultRouter();
  }

  defaultRouter() {
    this.router
      .get("", this.getList.bind(this))
      .delete(
        "",
        AuthenticateJob.instance.validateRequest.bind(AuthenticateJob.instance),
        this.deleteMany.bind(this)
      )
      .get("/:id", this.getDetail.bind(this))
      .post("/:id", this.getDetail.bind(this))
      .put("", AuthenticateJob.instance.validateRequest.bind(AuthenticateJob.instance), this.create.bind(this))
      .delete(
        "/:id",
        AuthenticateJob.instance.validateRequest.bind(AuthenticateJob.instance),
        this.delete.bind(this)
      )
      .post(
        "/:id/like",
        AuthenticateJob.instance.validateRequest.bind(AuthenticateJob.instance),
        this.like.bind(this)
      )
      .post(
        "/:id/dislike",
        AuthenticateJob.instance.validateRequest.bind(AuthenticateJob.instance),
        this.dislike.bind(this)
      );
  }

  async create(request, response) {
    try {
      const body = request.body ?? {};
      const userId = request.headers["funny-movie-user-id"];
      const detail = await this.service.create(body, userId);

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
