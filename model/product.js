const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  accountId: { type: String, required: true },
  name: { type: String, required: true },
  remarks: { type: String, required: true },
  typeList: { type: Array, required: true },
  image: { type: String, required: true },
  expiryDate: { type: Date, default: Date.now },
  price: { type: String, required: true },
  status: { type: String, required: true ,  default: "pending" },
  isAvailable: { type: Boolean, required: false }
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
