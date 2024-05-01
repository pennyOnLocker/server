const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  accountId: { type: String, required: true },
  name: { type: String, required: true },
  remarks: { type: String },
  typeList: { type: Array },
  image: { type: String },
  expiryDate: { type: Date, default: Date.now },
  price: { type: String },
  status: { type: String, required: true, default: "pending" },
  isAvailable: { type: Boolean },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("Product", schema);
