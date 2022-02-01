const { Router } = require("express");
const router = Router();
const {
  loginUserAndSendCredentials,
  signupUserAndSendCredentials,
  fetchUserDataById,
} = require("../controllers/user.controller");

router.route("/login").post(loginUserAndSendCredentials);
router.route("/signup").post(signupUserAndSendCredentials);
router.route("/user-data/:userId").get(fetchUserDataById);

module.exports = router;
