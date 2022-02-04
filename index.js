require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routers/user.router");
const cartRouter = require("./routers/cart.router");
const wishlistRouter = require("./routers/wishlist.router");
const productRouter = require("./routers/product.router");
const addressRouter = require("./routers/address.router");
const paymentRouter = require("./routers/payment.router");
const authenticate = require("./middleware/authenticate");
const { initializeDBConnection } = require("./config/db.config");
const app = express();
app.use(bodyParser.json());
app.use(cors());

initializeDBConnection();

app.get("/", (req, res) => {
  return res.json({ status: "Welcome to Nova Store server" });
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", authenticate, cartRouter);
app.use("/wishlists", authenticate, wishlistRouter);
app.use("/addresses", authenticate, addressRouter);
app.use("/payment", authenticate, paymentRouter);

app.listen(port, () => {
  console.log(`backend server running on port ${port}`);
});
