class BaseResponse {
  model = "";
  message = "Success";
  status = 1;
  isSuccess = true;
  detail = {};
  dataList = [];
  page = NaN;
  index = NaN;
  total = NaN;
  type = "single";
  error = "";

  sendDataList = (response, data, model) => {
    response.send({
      message: this.message,
      dataList: data ?? [],
      type: "multi",
      page: this.page,
      index: this.index,
      total: this.total,
    });
    response.end();
  };

  sendDetail = (response, detail, model) => {
    response.send({
      message: this.message,
      detail: detail,
      type: "single",
      model,
    });
    response.end();
  };

  sendError = (response, detail, model) => {
    response.send({
      message: detail.message,
      status: -1,
      model,
    });
  };
}

module.exports = BaseResponse;
