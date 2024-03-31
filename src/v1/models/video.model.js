const mongoose = require("mongoose");
const { ModelName } = require("../../config/constant.config");

const schema = mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    link: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    description: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    dislikeUsers: {
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

const Schema = mongoose.model(ModelName.videos, schema);

module.exports = Schema;
