
const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");
router.use(express.static(process.env.STATIC_DIR));
const { isUser } = require("../middlewares/isUser");
const { validateAddress } = require("./validators/address");



router.post("/products/:productId/review", isUser, userController.postReview);
router.post("/products/:productId/cart", isUser, userController.addToCart);
router.put("/products/:productId/cart/remove", isUser, userController.removeFromCart);
router.get(
    '/cart',
    isUser,
    userController.getCart
)
router.get("/orders", isUser, userController.getOrders);

router.put("/profile", isUser, userController.editProfile);

router.get('/addresses', isUser, userController.getAddresses);
router.put('/addresses', isUser, validateAddress, userController.setActiveAddress);
router.post('/addresses', isUser, validateAddress, userController.postAddress);
router.delete('/addresses', isUser, userController.deleteAddress);

module.exports = router;