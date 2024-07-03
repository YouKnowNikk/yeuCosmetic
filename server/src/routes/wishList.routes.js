import { Router } from "express";
import { getWishlist, toggleWishlist } from "../controllers/wishList/wishList.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/toggle").post(verifyUser, toggleWishlist);
router.route("/fetch").get(verifyUser, getWishlist);

export default router;
