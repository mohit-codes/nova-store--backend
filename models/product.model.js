const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String, required: true },
    price: { type: mongoose.Schema.Types.Number, required: true },
    image: { type: mongoose.Schema.Types.String, required: true },
    brand: { type: mongoose.Schema.Types.String, required: true },
    details: { type: mongoose.Schema.Types.Array, required: true },
    rating: { type: mongoose.Schema.Types.Number, required: true },
    isInStock: { type: mongoose.Schema.Types.Boolean, required: true },
    freeShipping: { type: mongoose.Schema.Types.Boolean, required: true },
    fastDelivery: { type: mongoose.Schema.Types.Boolean, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
