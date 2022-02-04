const { Router } = require("express");
const router = Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const { v4: uuid } = require("uuid");

router.route("/:userId").post(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const { token, cart } = req.body;

    const idempotencyKey = uuid();

    return stripe.customers
      .create({
        email: user.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create(
          {
            amount: cart.total + 100,
            currency: "inr",
            customer: customer.id,
          },
          { idempotencyKey }
        );
      })
      .then(async (result) => {
        await Cart.updateOne({ user: userId }, { items: [] });
        return res.json({ success: true, data: result });
      })
      .catch((err) => {
        // console.log("1st", err);
        return res.status(500).json({
          success: false,
          message: "Payment Failed",
          errorMessage: err.message,
        });
      });
  } catch (err) {
    // console.log("2nd", err);
    return res.status(500).json({
      success: false,
      message: "Payment Failed",
      errorMessage: err.message,
    });
  }
});

module.exports = router;
