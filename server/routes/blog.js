
const express = require("express");
const fileUpload = require("../middlewares/fileUpload");
const productController = require("../controllers/shop");
const adminController = require("../controllers/admin");
const blogController = require("../controllers/blog");
const userController = require("../controllers/user");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");
const { validateBlogPost } = require("./validators/post");
const { isAdmin } = require("../middlewares/isAdmin");
router.use(express.static(process.env.STATIC_DIR));


router.get("/all", blogController.getPosts)
router.get("/:postId", blogController.getPost)
module.exports = router;