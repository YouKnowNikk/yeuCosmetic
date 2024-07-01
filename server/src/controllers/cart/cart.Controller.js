import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Cart } from "../../models/cart.models.js";
import { Product } from "../../models/products.models.js";
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const addToCart = asyncHandler(async (req, res, next) => {
    const { productId, shadeName, quantity } = req.body;

    // Validate input
    if (!productId || !shadeName || !quantity) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }

    // Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ApiError(400, 'Invalid product ID format'));
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return next(new ApiError(404, 'Product not found'));
        }
    } catch (error) {
        return next(new ApiError(500, 'Internal server error'));
    }

    // Check if user is authenticated
    const userId = req.user ? req.user._id : null;

    let cartId = req.cookies.cartId;

    // Create a new cart ID if none exists
    if (!cartId) {
        cartId = uuidv4();
        res.cookie('cartId', cartId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
    }

    let cart;
    try {
        cart = await Cart.findOne({ cartId });
    } catch (error) {
        return next(new ApiError(500, 'Internal server error'));
    }

    // Create a new cart if none exists
    if (!cart) {
        cart = new Cart({ cartId, items: [] });
    }

    // Merge guest cart with user's cart if user is logged in
    if (userId) {
        try {
            const userCart = await Cart.findOne({ userId });

            if (userCart) {
                // Merge guest cart items into user's cart
                cart.items.forEach(guestItem => {
                    const existingItem = userCart.items.find(item => item.productId.toString() === guestItem.productId.toString() && item.shadeName === guestItem.shadeName);

                    if (existingItem) {
                        existingItem.quantity += guestItem.quantity;
                    } else {
                        userCart.items.push(guestItem);
                    }
                });

                // Delete guest cart after merging
                await Cart.deleteOne({ cartId });

                // Update the cartId to user's cartId
                cartId = userCart._id;
                res.cookie('cartId', cartId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                cart = userCart;
            } else {
                // Assign the cart to the user
                cart.userId = userId;
            }
        } catch (error) {
            return next(new ApiError(500, 'Internal server error'));
        }
    }

    // Add or update item in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId && item.shadeName === shadeName);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ productId, shadeName, quantity });
    }

    // Save and respond
    try {
        await cart.save();
        res.status(200).json(new ApiResponse(200, 'Product added to cart successfully', cart));
    } catch (error) {
        return next(new ApiError(500, 'Internal server error'));
    }
});

const getCart = asyncHandler(async (req, res, next) => {
    const userId = req.user ? req.user._id : null;
    const guestCartId = req.cookies.cartId;
   

    if (userId) {
        // User is logged in, handle user cart
        let cart = await Cart.findOne({ userId }).populate('items.productId', 'title price description');

        if (guestCartId) {
            const guestCart = await Cart.findOne({ cartId: guestCartId }).populate('items.productId', 'title price description');

            if (guestCart) {
                if (!cart) {
                    cart = new Cart({ userId, cartId: uuidv4(), items: [] });
                }

                // Merge guest cart items into user cart
                guestCart.items.forEach(item => {
                    const existingItem = cart.items.find(
                        i => i.productId.toString() === item.productId.toString() && i.shadeName === item.shadeName
                    );

                    if (existingItem) {
                        existingItem.quantity += item.quantity;
                    } else {
                        cart.items.push(item);
                    }
                });

                await cart.save();

                // Optionally, delete the guest cart
                await Cart.deleteOne({ cartId: guestCartId });

                // Clear the guest cartId cookie
                res.cookie('cartId', '', { expires: new Date(0) });
            }
        }

        if (!cart) {
            return res.status(200).json(new ApiResponse(200, 'Cart is empty', { items: [] }));
        }

        res.status(200).json(new ApiResponse(200, 'Cart fetched successfully', cart));
    } 
});




const deleteFromCart = asyncHandler(async (req, res, next) => {
    const { productId, shadeName } = req.body;
    if (!productId || !shadeName) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }

    const userId = req.user ? req.user._id : null;

    if (userId) {
        // User is logged in, handle user cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(400).json(new ApiResponse(400, 'No cart found'));
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.shadeName === shadeName);

        if (itemIndex === -1) {
            return next(new ApiError(404, 'Item not found in cart'));
        }

        cart.items.splice(itemIndex, 1);

        await cart.save();

        res.status(200).json(new ApiResponse(200, 'Item removed from cart successfully', cart));
    } else {
        // User is not logged in
        res.status(403).json(new ApiError(403, 'Login required to modify cart'));
    }
});


const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
    const { productId, shadeName, quantity } = req.body;
    if (!productId || !shadeName || quantity === undefined) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }

    const userId = req.user ? req.user._id : null;

    if (userId) {
        // User is logged in, handle user cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(400).json(new ApiResponse(400, 'No cart found'));
        }

        const item = cart.items.find(item => item.productId.toString() === productId && item.shadeName === shadeName);

        if (!item) {
            return next(new ApiError(404, 'Item not found in cart'));
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json(new ApiResponse(200, 'Cart item quantity updated successfully', cart));
    } else {
        // User is not logged in
        res.status(403).json(new ApiError(403, 'Login required to modify cart'));
    }
});

export {addToCart,getCart,deleteFromCart,updateCartItemQuantity}