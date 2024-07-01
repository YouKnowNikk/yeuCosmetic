import { Router } from "express";
import { addToCart, getCart } from "../controllers/cart/cart.Controller.js";

const router = Router();

router.route("/addtocart").post(addToCart);
router.route('/fetchCart').get(getCart)

export default router;