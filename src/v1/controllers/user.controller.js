const BaseController = require("../../base/base.controller");
const UserService = require("../services/user.service");

class UserController extends BaseController {
  service = new UserService();

  constructor() {
    super();

    this.defaultRouter()
  }
}

module.exports = UserController;
