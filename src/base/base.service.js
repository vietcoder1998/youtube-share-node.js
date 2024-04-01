class BaseService {
  model = {};

  constructor(model) {
    this.model = model;
  }

  search() {}
  getDetail() {}
  getList() {}
  update() {}
  updateDetail() {}
  deleteMany() {}
  create() {}
}

module.exports = BaseService;
