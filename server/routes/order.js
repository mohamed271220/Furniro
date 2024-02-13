const express = require("express");
const orderController = require("../controllers/order");
const router = express.Router();

router.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});
router.post("/", orderController.makeOrder);
router.post("/create-payment-intent", orderController.paymentIntent)
router.put("/:orderId/cancel", orderController.cancelOrder);
router.get("/:orderId/status", orderController.checkOrderStatus);

router.get("/orders/:orderId", orderController.getOrder);
module.exports = router;