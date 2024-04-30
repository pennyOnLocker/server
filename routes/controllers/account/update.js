const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const Account = db.Account;
const auth = require("../../middlewares/auth");

/**
 * updateAccount
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
  let resultObj = null;
  try {
    const where = {
      _id: id,
      deletedAt: null,
      deletedBy: null,
    };
    const update = {
      ...data,
    };
    resultObj = await Account.findOneAndUpdate(where, update, {
      new: true,
    }).lean();
  } catch (e) {
    return errorResponse(req, res, "no token", 500, e);
  }

  return successResponse(req, res, {}, 200, {});
};
