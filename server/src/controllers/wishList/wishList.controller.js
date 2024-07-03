import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Product } from "../../models/products.models.js";
import mongoose from 'mongoose';
import { Wishlist } from "../../models/wishlist.model.js";

export const toggleWishlist = asyncHandler(async (req, res, next) => {
    const { productId } = req.body;

    // Validate input
    if (!productId) {
        return next(new ApiError(400, 'Product ID must be provided'));
    }

    // Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ApiError(400, 'Invalid product ID format'));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ApiError(404, 'Product not found'));
    }

    const userId = req.user._id;
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
        wishlist = new Wishlist({ userId, products: [] });
    }

    const productIndex = wishlist.products.indexOf(productId);

    if (productIndex === -1) {
        // Add to wishlist
        wishlist.products.push(productId);
    } else {
        // Remove from wishlist
        wishlist.products.splice(productIndex, 1);
    }

    await wishlist.save();

    res.status(200).json(new ApiResponse(200, 'Wishlist updated successfully'));
});

export const getWishlist = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ userId }).populate('products', 'title price description');

    const wishlistItems = wishlist ? wishlist.products : [];

    res.status(200).json(new ApiResponse(200, 'Wishlist fetched successfully', { products: wishlistItems }));
});
