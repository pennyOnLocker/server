const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const Product = db.Product;
const auth = require("../../middlewares/auth");
const moment = require("moment");

/**
 * get product list
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
  let resultList = null;
  let fullResultList = null;
  let count = {};
  try {
    fullResultList = await Product.find({
      accountId: id,
      deletedAt: null,
      deletedBy: null,
    }).lean();
    count = {
      total: _.size(fullResultList),
      numOfExpiredItem: _.size(
        _.filter(fullResultList, (item) => {
          return moment(`${_.get(item, "expiryDate")}`).isAfter(moment());
        })
      ),
      numOfAvailbleItem: _.size(
        _.filter(fullResultList, (item) => {
          return moment(`${_.get(item, "expiryDate")}`).isBefore(moment());
        })
      ),
    };
  } catch (e) {
    console.log(e);
    return errorResponse(req, res, "system error", 500, e);
  }

  try {
    const where = {
      accountId: id,
      deletedAt: null,
      deletedBy: null,
    };
    resultList = await Product.find(where).lean();
  } catch (e) {
    console.log(e);
    return errorResponse(req, res, "system error", 500, e);
  }

  return successResponse(req, res, resultList, 200, { ...count });
};
