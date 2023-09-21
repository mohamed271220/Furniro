const express = require("express");
const fileUpload = require("../middlewares/fileUpload");
const productController = require("../controllers/shop");
const router = express.Router();

router.get("/products", productController.getProducts);

router.get("/products/:productId", productController.getProduct);

router.post("/:productId/review", productController.postReview);

router.post("/:productId/cart", productController.addToCart);

router.put("/:productId/cart/remove", productController.removeFromCart);

router.post("/order", productController.makeOrder);

router.put("/:orderId/order/cancel", productController.cancelOrder);

router.get("/:orderId/order/status", productController.checkOrderStatus);



// admin routes


router.post(
  "/addProduct",
  fileUpload.array("images", 4),

  productController.addProduct
);

router.put(
  "/editProduct/:productId",
  fileUpload.array("images", 4),

  productController.editProduct
);

router.delete(
  "/removeProduct/:productId",
  productController.removeProduct
);


router.get(
  "/orders", 
  productController.getOrders
);

router.get(
  '/cart',
  productController.getCart
)

router.put("/orders/:orderId", productController.updateOrder);
router.get("/orders/:orderId",productController.getOrder);


module.exports = router;
