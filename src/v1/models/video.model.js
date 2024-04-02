const mongoose = require("mongoose");
const { ModelName, ModelPath } = require("../../config/constant.config");

const schema = mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "Movie title",
    },
    link: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    description: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "This is default description",
    },
    dislike: [
      {
        type: mongoose.Schema.Types.String,
      },
    ],
    like: [
      {
        type: mongoose.Schema.Types.String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelName.user,
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
