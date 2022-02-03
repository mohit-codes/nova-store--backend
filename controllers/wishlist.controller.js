const Wishlist = require("../models/wishlist.model");
const User = require("../models/user.model");

const fetchWishlistItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user.wishlist !== undefined) {
      const wishlist = await Wishlist.findById(user.wishlist).populate("items");
      return res.json({
        success: true,
        items: wishlist.items,
      });
    }
    return res.json({
      success: false,
      massage: "Wishlist hasn't been created yet",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    const wishlist = await Wishlist.findById(user.wishlist);
    if (wishlist) {
      const alreadyExist = wishlist.items.some(
        (product) => product.toString() == productId
      );
      if (!alreadyExist) {
        wishlist.items.push(productId);
        await wishlist.save();
      }
    } else {
      let newWishlist = new Wishlist({
        items: [productId],
        user: userId,
      });
      newWishlist = await newWishlist.save();
      await user.updateOne({ wishlist: newWishlist._id });
    }
    const newUser = await User.findById(userId);
    const wishlistItems = await Wishlist.findById(newUser.wishlist).populate(
      "items"
    );
    return res.json({
      success: true,
      items: wishlistItems,
      message: "product added to wishlist",
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
    const wishlist = await Wishlist.findById(user.wishlist);
    const productExist = wishlist.items.some(
      (product) => product.toString() == productId
    );
    if (productExist) {
      await wishlist.updateOne({ $pull: { items: productId } });
    } else {
      return res.json({
        success: true,
        message: "Invalid Request",
      });
    }
    const wishlistItems = await Wishlist.findById(user.wishlist).populate(
      "items"
    );
    return res.json({
      success: true,
      items: wishlistItems,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { fetchWishlistItems, addToWishlist, removeItem };
