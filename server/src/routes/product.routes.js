import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct } from "../controllers/product.controller.js";
const router = Router();

router.route("/addproduct").post(upload.fields([{name:"thumbnail",maxCount:5},,{name:"customShadeImageUrl",maxCount:5}]),addProduct)

export default router