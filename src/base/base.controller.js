const { Router } = require("express");
const BaseService = require("./base.service");
const BaseResponse = require("./base.response");

class BaseController {
  router = new Router();
  requestHandler = new BaseResponse();
  service = new BaseService();
  baseResponse = new BaseResponse();

  constructor() {
    this.router
      .get("", this.getList.bind(this))
      .delete("", this.deleteMany.bind(this))
      .get(":id", this.getDetail.bind(this))
      .post(":id", this.getDetail.bind(this))
      .put(":id", this.create.bind(this))
      .delete(":id", this.delete.bind(this));
  }

  async getList(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const dataList = await this.service.getList(query);

      this.baseResponse.sendDataList(response, dataList);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDetail(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.detail(query);

      this.baseResponse.sendDetail(response, detail);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateDetail(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.updateDetail(query);

      this.baseResponse.sendDataList(response, detail);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.create(query);

      this.baseResponse.sendDataList(response, detail);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.delete(query);

      this.baseResponse.sendDataList(response, detail);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMany(request, response) {
    try {
      const query = request?.query ?? { page: 0, size: 10 };
      const detail = await this.service.deleteMany(query);

      this.baseResponse.sendDataList(response, detail);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = BaseController;
