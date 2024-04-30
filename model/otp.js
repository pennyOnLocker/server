const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  accountId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  code: { type: String, required: true },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("Otp", schema);
