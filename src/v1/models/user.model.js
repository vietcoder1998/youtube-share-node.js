const mongoose = require("mongoose");
const { ModelName } = require("../../config/constant.config");

const schema = mongoose.Schema(
  {
    email: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    youtubeSrc: {
      type: mongoose.Schema.Types.String,
      required: false,

      default: "",
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Schema = mongoose.model(ModelName.user, schema);

module.exports = Schema;
