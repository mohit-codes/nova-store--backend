require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user.router");
const cartRouter = require("./routers/cart.router");
const wishlistRouter = require("./routers/wishlist.router");
const productRouter = require("./routers/product.router");
const { initializeDBConnection } = require("./config/db.config");
const app = express();
app.use(bodyParser.json());

initializeDBConnection();

app.get("/", (res) => {
  return res.send({ status: "Welcome to Nova Store server" });
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/wishlists", wishlistRouter);

app.listen(port, () => {
  console.log(`backend server running on port ${port}`);
});
