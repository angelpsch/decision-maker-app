const express = require("express");
const { signin, signout } = require("../controllers/auth.js");

const router = express.Router();

router.route("/auth/signin").post(signin);

router.route("/auth/signout").get(signout);

module.exports = router;
