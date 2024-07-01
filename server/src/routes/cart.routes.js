import { Router } from "express";
import { addToCart, deleteFromCart, getCart, updateCartItemQuantity } from "../controllers/cart/cart.Controller.js";
import { isUserExist, verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addtocart").post(isUserExist,addToCart);
router.route('/fetchCart').get(verifyUser,getCart);
router.route("/deletefromcart").post(verifyUser,deleteFromCart);
router.route("/updatequantity").post(verifyUser,updateCartItemQuantity)

export default router;