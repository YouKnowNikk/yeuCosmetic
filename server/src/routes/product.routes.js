import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct, getProducts } from "../controllers/product/product.controller.js";
const router = Router();

router.route("/addproduct").post(upload.fields([{name:"thumbnail",maxCount:5},,{name:"customShadeImageUrl",maxCount:5}]),addProduct);
router.route("/products").get(getProducts)

export default router