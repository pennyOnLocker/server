const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  accountId: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  name: { type: String, required: true },
  remarks: { type: String },
  typeList: { type: Array },
  image: { type: String },
  expiryDate: { type: Date, default: Date.now },
  price: { type: String },
  status: { type: String },
  isAvailable: { type: Boolean },
  productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("Store", schema);
