const { Router } = require("express");
const router = Router();
const {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
} = require("../controllers/address.controller");

router.route("/").get(fetchAllAddresses);
router.route("/:userId").post(addNewAddress);
router.route("/:addressId").delete(deleteAddress);

module.exports = router;
