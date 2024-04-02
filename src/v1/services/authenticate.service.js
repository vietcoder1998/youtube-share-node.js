const BaseService = require("./../../base/base.service");
const { ModelName } = require("./../../config/constant.config");
const UserModel = require("./../models/user.model");
const AuthenticateServiceJob = require("./../../job/authenticate.job");
const md5 = require("md5");

class AuthenticateService extends BaseService {
  name = ModelName.authenticate;
  userModel = UserModel;
  authenticateJob = AuthenticateServiceJob.instance;

  constructor(name) {
    super()
    
    if (name) {
      this.name = name;
    }
  }

  async onLogin(email, password) {
    const user = await this.userModel.findOne({ email, password: md5(password) });

    if (!user) {
      throw new Error("Email or password is not found");
    }

    return this.authenticateJob.register(user._id.toString(), email, user.password);
  }

  async onRegister(email, password) {
    const isUser = await UserModel.exists({ email });

    if (isUser) {
      throw new Error("User already registered");
    }

    const user = await this.userModel.create({
      email: email,
      username: email,
      password: md5(password),
    });

    return {
      id: user.id,
      username: email,
      email,
    };
  }

  async onLogout(id, token) {
    return this.authenticateJob.unRegister(id, token);
  }

  async validateToken(id, token) {
    return this.authenticateJob.validate(id, token);
  }

  async checkTokenExists(token) {
    return this.authenticateJob.checkTokenExists(token);
  }
}

module.exports = AuthenticateService;
