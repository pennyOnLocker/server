const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const Product = db.Product;
const auth = require("../../middlewares/auth");
const moment = require("moment");
var ObjectId = require('mongodb').ObjectId;

/**
 * get product detail
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

  try {
    const where = {
      accountId: id,
      _id: productId,
      deletedAt: null,
      deletedBy: null,
    };
    resultObj = await Product.findOne(where).lean();
  } catch (e) {
    console.log(e);
    return errorResponse(req, res, "system error", 500, e);
  }

  return successResponse(req, res, resultObj, 200, {});
};
