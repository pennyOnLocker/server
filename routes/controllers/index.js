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
router.get("/account/getMe", require("routes/controllers/account/getMe"));

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

module.exports = router;
