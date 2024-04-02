const mongoose = require("mongoose");
const BaseService = require("../../base/base.service");
const VideoModel = require("../models/video.model");
const UserModel = require("../models/user.model");
const { ModelName, ModelPath } = require("../../config/constant.config");

class VideoService extends BaseService {
  model = VideoModel;
  userModel = UserModel;
  getList = async () => {
    const dataList = await this.model.find().populate(ModelPath.user, "id email");

    return dataList.map(item => {
      if (!item.user) {
        return {...item.toObject(), user: {
          id: '',
          gmail: '',
        }}
      }

      return item.toObject()
    });
  };

  create = async (body, userId) => {
    return this.model.create({
      ...body,
      user: new mongoose.Types.ObjectId(userId),
    });
  };
}

module.exports = VideoService;
