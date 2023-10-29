
const express = require("express");
const fileUpload = require("../middlewares/fileUpload");
const adminController = require("../controllers/admin");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");
router.use(express.static(process.env.STATIC_DIR));


// admin routes
router.post(
    "/product",
    fileUpload.array("images", 4),
    adminController.addProduct
);
router.put(
    "/product/:productId",
    fileUpload.array("images", 4),
    adminController.editProduct
);
router.delete(
    "/product/:productId",
    adminController.removeProduct
);
//for dashboard
router.get(
    "/orders",
    adminController.getOrders
);

router.put("/orders/:orderId", adminController.updateOrder);
module.exports = router;