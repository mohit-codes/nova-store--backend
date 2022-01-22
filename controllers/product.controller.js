const Product = require("../models/product.model");
const FeaturedProduct = require("../models/featuredProducts.model");
const Category = require("../models/category.model");

const fetchAllProducts = async (_, res) => {
  try {
    const products = await Product.find({});
    return res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    return res.json({
      success: false,
      products: null,
      message: error.message,
    });
  }
};

const fetchProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (product) {
      return res.json({
        success: true,
        product: product,
      });
    }
    return res.json({
      success: false,
      product: null,
      message: "product not found",
    });
  } catch (error) {
    return res.json({
      success: false,
      product: null,
      message: error.message,
    });
  }
};

const fetchFeaturedProducts = async (_, res) => {
  try {
    const products = await FeaturedProduct.find({});
    return res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    return res.json({
      success: false,
      products: null,
      message: error.message,
    });
  }
};

const fetchProductCategories = async (_, res) => {
  try {
    const categories = await Category.find({});
    return res.json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    return res.json({
      success: false,
      categories: null,
      message: error.message,
    });
  }
};

module.exports = {
  fetchAllProducts,
  fetchProductById,
  fetchProductCategories,
  fetchFeaturedProducts,
};
