const Cart = require("../models/cart.model");
const User = require("../models/user.model");

const fetchAllCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user.cart !== undefined) {
      const cart = await Cart.findById(user.cart).populate("items.product");
      return res.json({
        success: true,
        items: cart.items,
      });
    }
    return res.json({
      success: false,
      massage: "Cart hasn't been created yet",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    const cart = await Cart.findById(user.cart);
    if (cart) {
      const alreadyExist = cart.items.some(
        ({ product }) => product.toString() == productId
      );
      if (!alreadyExist) {
        cart.items.push({
          product: productId,
          quantity: 1,
        });
        await cart.save();
      }
    } else {
      let newCart = new Cart({
        items: [{ product: productId, quantity: 1 }],
        user: userId,
      });
      newCart = await newCart.save();
      await user.updateOne({ cart: newCart._id });
    }
    const newUser = await User.findById(userId);
    const cartItems = await Cart.findById(newUser.cart).populate(
      "items.product"
    );
    return res.json({
      success: true,
      items: cartItems,
      message: "product added to cart",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    const cart = await Cart.findById(user.cart);
    const productExist = cart.items.some(
      ({ product }) => product.toString() == productId
    );
    if (productExist) {
      await cart.updateOne({ $pull: { items: { product: productId } } });
    } else {
      return res.json({
        success: true,
        message: "Invalid Request",
      });
    }
    const cartItems = await Cart.findById(user.cart).populate("items.product");
    return res.json({
      success: true,
      items: cartItems,
      message: "Product removed from cart",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const changeQuantity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const user = await User.findById(userId);
    let cart = await Cart.findById(user.cart);
    const productExist = cart.items.some(
      ({ product }) => product.toString() == productId
    );
    if (productExist) {
      let items = cart.items.map((item) =>
        item.product.toString() == productId
          ? { ...item._doc, quantity: quantity }
          : item
      );
      cart.items = items;
      cart = await cart.save();
    } else {
      return res.json({
        success: true,
        message: "Invalid Request",
      });
    }
    return res.json({
      success: true,
      items: cart.items,
      message: "Product quantity changed",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
const makeOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.updateOne({ user: userId }, { items: [] });
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "something went wrong",
      errorMessage: err.message,
    });
  }
};

module.exports = {
  fetchAllCartItems,
  addToCart,
  removeItem,
  changeQuantity,
  makeOrder,
};
