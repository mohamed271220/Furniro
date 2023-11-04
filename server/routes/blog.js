
const express = require("express");
const fileUpload = require("../middlewares/fileUpload");
const productController = require("../controllers/shop");
const adminController = require("../controllers/admin");
const blogController = require("../controllers/blog");
const userController = require("../controllers/user");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");
router.use(express.static(process.env.STATIC_DIR));


router.get("/all", blogController.getPosts)
router.post("/", fileUpload.array("images", 4), blogController.postPost)
module.exports = router;