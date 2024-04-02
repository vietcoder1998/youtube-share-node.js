const mongoose = require("mongoose");
const BaseService = require("../../base/base.service");
const VideoModel = require("../models/video.model");
const UserModel = require("../models/user.model");
const { ModelName, ModelPath } = require("../../config/constant.config");

class VideoService extends BaseService {
  model = VideoModel;
  userModel = UserModel;
  getList = async () => {
    const dataList = await this.model
      .find()
      .populate(ModelPath.user, "id email");

    return dataList.map((item) => {
      if (!item.user) {
        return {
          ...item.toObject(),
          user: {
            id: "",
            gmail: "",
          },
        };
      }

      return item.toObject();
    });
  };

  create = async (body, userId) => {
    return this.model.create({
      ...body,
      user: new mongoose.Types.ObjectId(userId),
    });
  };

  onLikeVideo = async (videoId, userId) => {
    const video = await this.model.findOne({ _id: videoId });

    if (!video) {
      throw new Error(`Video not found`);
    }

    const user = await this.userModel.findOne({ _id: userId});

    if (!user) {
      throw new Error(`User not found`);
    }

    if (video.like.includes(userId)) {
      video.like = video.like.filter((item) => item !== userId);
    } else {
      video.like = [...video.like, userId];
    }

    const result = await video.save();

    return result;
  };

  onDislikeVideo = async (videoId, userId) => {
    const video = await this.model.findOne({ _id: videoId });

    if (!video) {
      throw new Error(`Video not found`);
    }

    const user = await this.userModel.findOne({ _id: userId});

    if (!user) {
      throw new Error(`User not found`);
    }

    if (video.dislike.includes(userId)) {
      video.dislike = video.dislike.filter((item) => item !== userId);
    } else {
      video.dislike = [...video.dislike, userId];
    }

    const result = await video.save();

    return result;
  };
}

module.exports = VideoService;
