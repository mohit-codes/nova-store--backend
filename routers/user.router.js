const { Router } = require("express");
const router = Router();
const {
  loginUserAndSendCredentials,
  signupUserAndSendCredentials,
} = require("../controllers/user.controller");

router.route("/login").post(loginUserAndSendCredentials);
router.route("/signup").post(signupUserAndSendCredentials);

module.exports = router;
