const { Router } = require("express");
const router = Router();
const {
  fetchAllProducts,
  fetchProductById,
} = require("../controllers/product.controller");

router.route("/").get(fetchAllProducts);
router.route("/:productId").get(fetchProductById);

module.exports = router;
