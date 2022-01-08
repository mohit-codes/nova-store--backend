const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "username is required to add user",
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    wishlist: { type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
