const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const Account = db.Account;
const Otp = db.Otp;
const auth = require("../../middlewares/auth");
const moment = require("moment");
/**
 * verify otp
 */
module.exports = async (req, res) => {
  let otpObj = null;
  let resultObj = null;
  let data = req.body;

  try {
    const where = {
      email: _.get(data, "email"),
      deletedAt: null,
      deletedBy: null,
    };
    resultObj = await Account.findOne(where).lean();
    otpObj = await Otp.findOne({
      code: _.get(data, "otp"),
      accountId: _.get(resultObj, "_id"),
      deletedAt: null,
      deletedBy: null,
    });
    if (!otpObj) {
      return errorResponse(req, res, "otpnotcorrect", 412, {});
    }
  } catch (e) {
    console.log(e);
    return errorResponse(req, res, "no token", 500, e);
  }

  return successResponse(req, res, {}, 200, {});
};
