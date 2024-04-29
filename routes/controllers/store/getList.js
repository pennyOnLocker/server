const db = require("_helpers/db");
const _ = require("lodash");
const { successResponse, errorResponse } = require("../../../helpers");
const Store = db.Store;
const auth = require("../../middlewares/auth");
const moment = require("moment");

/**
 * get store list
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

  try {
    const where = {
      isAvailable: true,
      status: 'pending',
      deletedAt: null,
      deletedBy: null,
    };
    resultList = await Store.find(where).populate("accountId").lean();
    console.log(resultList);
    resultList = _.reduce(
      resultList,
      (result, item) => {
        console.log
        result.push({
          ...item,
          accountId: {
            firstName: _.get(item, "accountId[0].firstName"),
            lastName: _.get(item, "accountId[0].lastName"),
            phoneNumber: _.get(item, "accountId[0].phoneNumber"),
          },
        });
        return result;
      },
      []
    );
  } catch (e) {
    console.log(e);
    return errorResponse(req, res, "system error", 500, e);
  }

  return successResponse(req, res, resultList, 200, {});
};
