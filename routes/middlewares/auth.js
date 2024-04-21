const _ = require("lodash");
const moment = require("moment");
const { successResponse, errorResponse } = require("../../helpers");
const jwt = require("jsonwebtoken");

/**
 * depends
 * - jwtDecoded
 */

module.exports = async (req) => {
  const token = req.header("Authorization") || null;
  const itemList = _.split(token, " ");
  let decoded = {};
  try {
    decoded = await jwt.verify(
      _.last(itemList),
      "fsgfhldjasduaiytfghjsadklcdacgdhusjakl"
    );
    if (decoded) {
      return decoded;
    } else {
      throw "acc not found";
    }
  } catch (e) {
    throw e;
  }
};
