import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/products.models.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const addProduct = asyncHandler(async (req, res, next) => {
    const { title, modelNumber, shortDescription, description, price, category, model, tags } = req.body;
    if (!title || !modelNumber || !shortDescription || !description || !price || !category || !model) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }

    const existingProduct = await Product.exists({ modelNumber });
    if (existingProduct) {
        return next(new ApiError(400, `Model number already exists: ${modelNumber}`));
    }

    const thumbnailUrls = await Promise.all((req.files['thumbnail'] || []).map(async (file) => {
        const result = await uploadOnCloudinary(file.path);
        return result.secure_url;
    }));

    let customShadeImages = [];
    if (req.files['customShadeImageUrl']) {
        customShadeImages = await Promise.all(req.files['customShadeImageUrl'].map(async (file) => {
            const result = await uploadOnCloudinary(file.path);
            return result.secure_url;
        }));
    }

    let modelObject;
    try {
        modelObject = typeof model === 'string' ? JSON.parse(model) : model;
    } catch (error) {
        return next(new ApiError(400, 'Invalid model format'));
    }

    if (!modelObject.shades || !Array.isArray(modelObject.shades)) {
        return next(new ApiError(400, 'Model shades must be provided as an array'));
    }

    for (const shade of modelObject.shades) {
        if (!shade.name) {
            return next(new ApiError(400, 'Each shade must have a valid name'));
        }
    }

    if (customShadeImages.length > 0) {
        modelObject.customShade = customShadeImages.map((imageUrl, index) => ({
            name: (modelObject.customShade && modelObject.customShade[index] && modelObject.customShade[index].name) || '',
            imageFile: imageUrl
        }));
    }


    const product = new Product({
        title,
        modelNumber,
        shortDescription,
        description,
        price,
        thumbnails: thumbnailUrls,
        category,
        model: modelObject,
        tags,
        reviews: {
            averageRating: 0,
            numberOfReviews: 0
        }
    });

    await product.save();

    res.status(201).json(new ApiResponse(201, 'Product added successfully', product));
});

export { addProduct };
