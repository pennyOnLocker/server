const _ = require("lodash");

module.exports = {
  successResponse: (req, res, data, code = 200, extra = {}) => {
    return res.send({
      code,
      data,
      success: true,
      extra
    });
  },
  errorResponse: (
    req,
    res,
    errorMessage = "System Error",
    code = 500,
  ) =>
    res.status(code).json({
      code,
      errorMessage,
      success: false,
    }),
};
