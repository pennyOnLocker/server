const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const crypto = require("crypto");

const Account = db.Account;

const getHashed = (str) =>
  crypto
    .createHmac("sha256", "fsgfhldjasduaiytfghjsadklcdacgdhusjakl")
    .update(str)
    .digest("hex");

/**
 * create account
 */
module.exports = async (req, res) => {
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
    const existingAccount = await Account.findOne({
      phoneNumber: data.phoneNumber,
      deletedAt: null,
      deletedBy: null,
    }).lean();

    if (existingAccount) {
      return errorResponse(req, res, "phoneNumAlreadyRegistered", 412, {});
    }

    resultObj = await Account.create({
      ...data,
      userLogin: {
        password: getHashed(_.get(data, "password")),
      },
    });

    resultObj = await Account.findOne({
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
