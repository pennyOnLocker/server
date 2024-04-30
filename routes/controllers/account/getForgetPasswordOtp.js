const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const Account = db.Account;
const Otp = db.Otp;
const auth = require("../../middlewares/auth");
const moment = require('moment');
/**
 * get forget password otp
 */
module.exports = async (req, res) => {

  let otpObj = null;
  let resultObj = null;
  let data = req.body;

  try {
    const where = {
      email: _.get(data, 'email'),
      deletedAt: null,
      deletedBy: null,
    };
    resultObj = await Account.findOne(where).lean();
    const code = `${Math.floor(Math.random()*90000) + 10000}${moment().unix()}`
    console.log(code)
    otpObj = await Otp.create({
        createdAt: moment(),
        accountId: _.get(resultObj, '_id'),
        code,
        deletedAt: null,
        deletedBy: null,
      });
  } catch (e) {
    console.log(e)
    return errorResponse(req, res, "no token", 500, e);
  }

  return successResponse(req, res, {}, 200, {});
};
