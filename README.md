# Nova Store Backend

Backend using ExpressJS connected to MongoDB through Mongoose.

## List of API endpoints
  
### Users

- POST /users/login - Takes username and password as a parameter and returns token and user.
- POST /users/signup - Providing name, password, and unique email would add a new user into the database.

### Products

- GET /products - fetches all products.
- GET /products/single-product/:productId - fetches single product.
- GET /products/categories - fetches product categories
- GET /products/featured - fetches featured products

### Wishlists

- GET /wishlists/fetch-wishlist/:userId - fetches user's wishlist items.
- POST /wishlists/add-item/:userId/:productId - adds product to user's wishlist.
- DELETE /wishlists/remove-item/:userId/:productId" - removes the product from the user's wishlist.  

### Carts

- GET /carts/fetch-cart/:userId - fetches user's cart items.
- POST /carts/add-item/:userId/:productId - adds product to user's cart.
- POST /carts/update-quantity/:userId - Takes productId and quantity to update the quantity of that product in user's cart.
- DELETE /carts/remove-item/:userId/:productId" - removes the product from the user's cart.
