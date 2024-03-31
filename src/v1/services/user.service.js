const BaseService = require("../../base/base.service");
const UserModel = require("../models/user.model");

class UserService extends BaseService {
  model = UserModel;
}

module.exports = UserService;
