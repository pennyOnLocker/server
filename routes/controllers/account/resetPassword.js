const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const Account = db.Account;
const crypto = require("crypto");

const getHashed = (str) =>
  crypto
    .createHmac("sha256", "fsgfhldjasduaiytfghjsadklcdacgdhusjakl")
    .update(str)
    .digest("hex");

/**
 * reset password
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
    const update = {
      userLogin: {
        password: getHashed(_.get(data, "password")),
      },
    };

    resultObj = await Account.findOneAndUpdate(where, update, {
      new: true,
    }).lean();
  } catch (e) {
    console.log(e);
    return errorResponse(req, res, "no token", 500, e);
  }

  return successResponse(req, res, {}, 200, {});
};
