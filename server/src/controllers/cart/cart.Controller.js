import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Cart } from "../../models/cart.models.js";
import { Product } from "../../models/products.models.js";
import { v4 as uuidv4 } from 'uuid';

const addToCart = asyncHandler(async (req, res, next) => {
    const { productId, shadeName, quantity } = req.body;
    if (!productId || !shadeName || !quantity) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ApiError(404, 'Product not found'));
    }

    let cartId = req.cookies.cartId;

    if (!cartId) {
        cartId = uuidv4();
        res.cookie('cartId', cartId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); 
    }

    let cart = await Cart.findOne({ cartId });

    if (!cart) {
        cart = new Cart({ cartId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId && item.shadeName === shadeName);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ productId, shadeName, quantity });
    }

    await cart.save();

    res.status(200).json(new ApiResponse(200, 'Product added to cart successfully', cart));
});

const getCart = asyncHandler(async (req, res, next) => {
    const cartId = req.cookies.cartId;

    if (!cartId) {
        return res.status(200).json(new ApiResponse(200, 'Cart is empty', { items: [] }));
    }

    const cart = await Cart.findOne({ cartId }).populate('items.productId');

    if (!cart) {
        return res.status(200).json(new ApiResponse(200, 'Cart is empty', { items: [] }));
    }

    res.status(200).json(new ApiResponse(200, 'Cart fetched successfully', cart));
});
const deleteFromCart = asyncHandler(async (req, res, next) => {
    const { productId, shadeName } = req.body;
    if (!productId || !shadeName) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }

    const cartId = req.cookies.cartId;

    if (!cartId) {
        return res.status(400).json(new ApiResponse(400, 'No cart found'));
    }

    const cart = await Cart.findOne({ cartId });

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
});
const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
    const { productId, shadeName, quantity } = req.body;
    if (!productId || !shadeName || quantity === undefined) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }

    const cartId = req.cookies.cartId;

    if (!cartId) {
        return res.status(400).json(new ApiResponse(400, 'No cart found'));
    }

    const cart = await Cart.findOne({ cartId });

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
});


export { addToCart, getCart ,deleteFromCart,updateCartItemQuantity };