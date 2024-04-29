const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const auth = require("../../middlewares/auth");
const Store = db.Store;

/**
 * create store
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

  let data = req.body;
  /**
   * validate and parse data
   * use: data
   * modify: data
   */
  data = _.omit(data, [
    "createdAt",
    "createdBy",
    "updatedBy",
    "updatedAt",
    "deletedAt",
    "deletedBy",
  ]);

  let resultObj = null;
  try {
    resultObj = await Store.create({
      ...data,
      accountId: id,
    });

    resultObj = await Store.findOne({
      _id: resultObj._id,
      deletedBy: null,
      deletedAt: null,
    }).lean();
  } catch (e) {
    console.log(e);
    return errorResponse(req, res, "systemError", 500, e);
  }

  return successResponse(req, res, resultObj, 200, {});
};
