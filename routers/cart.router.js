const { Router } = require("express");
const router = Router();
const {
  addToCart,
  changeQuantity,
  fetchAllCartItems,
  removeItem,
} = require("../controllers/cart.controller");

router.route("/fetch-cart/:userId").get(fetchAllCartItems);
router.route("/add-item/:userId/:productId").post(addToCart);
router.route("/remove-item/:userId/:productId").delete(removeItem);
router.route("/update-quantity/:userId").post(changeQuantity);

module.exports = router;
