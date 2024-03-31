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
  error = ''

  sendDataList = (response, data) => {
    response.send({
      message: this.message,
      data: data ?? [],
      type: "multi",
      page: this.page,
      index: this.index,
      total: this.total,
    });
    response.end();
  };

  senDetail = (response, detail) => {
    response.send({
      message: this.message,
      detail,
      type: this.type,
    });
    response.end();
  };

  sendError = (response, detail) => { 
    response.send({
        message,
        status: -1
    })
  }
}

module.exports = BaseResponse