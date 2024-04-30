const express = require("express");

const router = express.Router();
const auth = require("routes/middlewares/auth");

/**
 * auth
 */
const createToken = require("routes/controllers/auth/createToken");
router.post("/users/authenticate", createToken);

/**
 * account
 */
router.post("/account", require("routes/controllers/account/create"));
router.post("/account/forgrt-password-otp", require("routes/controllers/account/getForgetPasswordOtp"));
router.post("/account/verify-otp", require("routes/controllers/account/verifyOtp"));
router.post("/account/reset-password", require("routes/controllers/account/resetPassword"));
router.get("/account/getMe", require("routes/controllers/account/getMe"));
router.put("/account/change-password", require("routes/controllers/account/changePassword"));
router.put("/account", require("routes/controllers/account/update"));
/**
 * product
 */
router.post("/product", require("routes/controllers/product/create"));
router.get("/product", require("routes/controllers/product/getList"));
router.get("/product/:id", require("routes/controllers/product/getDetail"));
router.put("/product/:id", require("routes/controllers/product/update"));

/**
 * store
 */
router.post("/store", require("routes/controllers/store/create"));
router.get("/store", require("routes/controllers/store/getList"));
router.get("/store-token", require("routes/controllers/store/getListToken"));

module.exports = router;
