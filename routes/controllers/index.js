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

module.exports = router;
