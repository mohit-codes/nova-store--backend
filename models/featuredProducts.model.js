const mongoose = require("mongoose");

const featuredProductSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true },
  imgSrc: { type: mongoose.Schema.Types.String, required: true },
  productId: { type: mongoose.Schema.Types.String, required: true },
  alt: { type: mongoose.Schema.Types.String, required: true },
});

const FeaturedProduct = mongoose.model(
  "FeaturedProduct",
  featuredProductSchema
);

module.exports = FeaturedProduct;
