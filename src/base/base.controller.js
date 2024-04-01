const { Router } = require("express");
const BaseService = require("./base.service");
const BaseResponse = require("./base.response");

class BaseController {
  router = new Router();
  requestHandler = new BaseResponse();
  service = new BaseService();
  baseResponse = new BaseResponse();
  isOffDefault = false;

  defaultRouter() {
    this.router
      .get("/", this.getList.bind(this))
      .delete("/", this.deleteMany.bind(this))
      .get("/:id", this.getDetail.bind(this))
      .post("/:id", this.getDetail.bind(this))
      .put("/:id", this.create.bind(this))
      .delete("/:id", this.delete.bind(this));
  }

  customRouter() {}
  async getList(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const dataList = await this.service.getList(query);

      this.baseResponse.sendDataList(response, dataList);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async getDetail(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.getDetail(query);

      this.baseResponse.sendDetail(response, detail);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async updateDetail(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.updateDetail(query);

      this.baseResponse.sendDataList(response, detail);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async create(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.create(query);

      this.baseResponse.sendDataList(response, detail);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async delete(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.delete(query);

      this.baseResponse.sendDataList(response, detail);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }

  async deleteMany(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.deleteMany(query);

      this.baseResponse.sendDataList(response, detail);
    } catch (error) {
      this.baseResponse.sendError(response, error);
    }
  }
}

module.exports = BaseController;
