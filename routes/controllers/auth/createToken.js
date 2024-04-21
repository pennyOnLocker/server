const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Account = db.Account;

const getHashed = str => crypto
  .createHmac('sha256', 'fsgfhldjasduaiytfghjsadklcdacgdhusjakl')
  .update(str)
  .digest('hex');

module.exports = async (req, res) => {
  const { body } = req;
  const { phoneNumber, password } = body;


  let resultObj = null;
  try {
    const where = {
      phoneNumber,
      'userLogin.password': getHashed(password),
      deletedAt: null,
      deletedBy: null,
    };

    resultObj = await Account.findOne(where);

    if (!resultObj) {
      return errorResponse(req, res, "systemError", 403);
    }
  } catch (e) {
    console.log(e)
    return errorResponse(req, res, "systemError", 500);
  }
  resultObj = {
    ...resultObj,
    token: jwt.sign({
      userId: resultObj._id,
      createdAt: moment().utc().format(),
    }, 'fsgfhldjasduaiytfghjsadklcdacgdhusjakl'),
  };
  return successResponse(req, res, resultObj, 200, {});
};
