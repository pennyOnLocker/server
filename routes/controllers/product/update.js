const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const Product = db.Product;
const Store = db.Store;
const auth = require("../../middlewares/auth");
const moment = require("moment");

/**
 * update product detail
 */
module.exports = async (req, res) => {
  let authResp = {};
  try {
    authResp = await auth(req);
  } catch (e) {
    return errorResponse(req, res, "no token", 500, e);
  }
  const id = _.get(authResp, "userId", null);
  if (!id) {
    return errorResponse(req, res, "no token", 500, e);
  }

  const productId = _.get(req.params, "id", null);

  let resultObj = null;
  let storeObj = null;
  let data = req.body;
  /**
   * validate and parse data
   * use: data
   * modify: data
   */
  data = _.omit(data, [
    "_id",
    "createdAt",
    "createdBy",
    "updatedBy",
    "updatedAt",
    "deletedAt",
    "deletedBy",
  ]);

  try {
    const where = {
      accountId: id,
      _id: productId,
      deletedAt: null,
      deletedBy: null,
    };
    resultObj = await Product.findOneAndUpdate(where, data, {
      new: true,
    }).lean();
  } catch (e) {
    console.log(e);
    return errorResponse(req, res, "system error", 500, e);
  }

  try {
    storeObj = await Store.findOne({
      productId: productId,
      deletedBy: null,
      deletedAt: null,
    }).lean();
    if (!storeObj && _.get(data, "isAvailable")) {
      storeObj = await Store.create({
        ...data,
        productId: productId,
      });
    } else {
      storeObj = await Store.findOneAndUpdate(
        { productId: productId, deletedBy: null, deletedAt: null },
        {
          ...data,
        },
        {
          new: true,
        }
      ).lean();
    }
  } catch (e) {
    console.log(e);
    return errorResponse(req, res, "system error", 500, e);
  }

  return successResponse(req, res, resultObj, 200, {});
};
