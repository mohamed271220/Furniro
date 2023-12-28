
const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");
router.use(express.static(process.env.STATIC_DIR));
const {isUser} = require("../middlewares/isUser");



router.post("/products/:productId/review", userController.postReview);
router.post("/products/:productId/cart", userController.addToCart);
router.put("/products/:productId/cart/remove", userController.removeFromCart);
router.get(
    '/cart',
    userController.getCart
)
router.get("/orders", isUser ,userController.getOrders);
router.put("/profile", userController.editProfile);

router.get('/addresses', isUser, userController.getAddresses);
router.post('/addresses', isUser, userController.postAddress);
router.delete('/addresses', isUser, userController.deleteAddress);

module.exports = router;