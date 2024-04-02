const BaseController = require("../../base/base.controller");
const { ModelName } = require("../../config/constant.config");
const AuthenticateService = require("../services/authenticate.service");

class AuthenticateController extends BaseController {
  service = new AuthenticateService();
  name = ModelName.authenticate;

  constructor() {
    super();
    this.router
      .post("/login", this.login.bind(this))
      .put("/register", this.register.bind(this))
      .delete("/logout", this.logOut.bind(this))
      .post("/validateToken", this.validateToken.bind(this));
  }

  async login(request, response) {
    try {
      const { email, password } = request.body ?? { email: "", password: "" };
      const detail = await this.service.onLogin(email, password);

      this.baseResponse.sendDetail(response, detail);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async register(request, response) {
    try {
      const { email, password } = request.body ?? { email: "", password: "" };
      const detail = await this.service.onRegister(email, password);

      this.baseResponse.sendDetail(response, detail, this.name);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async logOut(request, response) {
    try {
      const userId = request.headers["funny-movie-user-id"];
      const token = request.headers.token.replace("Bearer ", "");
      const detail = await this.service.onLogout(userId, token);

      this.baseResponse.sendDetail(response, detail, this.name);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async validateToken(request, response) {
    try {
      const token = request.headers.authorization?.split("bearer ")?.at(0);
      const detail = await this.service.checkTokenExists(token);

      this.baseResponse.sendDetail(response, detail, this.name);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }
}

module.exports = AuthenticateController;
