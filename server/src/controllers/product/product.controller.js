import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Product } from "../../models/products.models.js";
import { uploadOnCloudinary } from '../../utils/cloudinary.js';


const addProduct = asyncHandler(async (req, res, next) => {
    const { title, modelNumber, shortDescription, description, price, category, model, tags ,customShadeNames} = req.body;
    if (!title || !modelNumber || !shortDescription || !description || !price || !category || !model) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }

    const existingProduct = await Product.exists({ modelNumber });
    if (existingProduct) {
        return next(new ApiError(400, `Model number already exists: ${modelNumber}`));
    }
    let csn = customShadeNames.split(",").map(shade=>shade.trim())

    
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
            name: (csn && csn[index] ) || '',
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


const getProducts = asyncHandler(async (req, res, next) => {
    const { shadeName, category, search } = req.query;

    let query = {};

    // Handle category filter
    if (category) {
        query.category = category;
    }

  
    if (shadeName) {
        query.$or = [
            { "model.shades.name": { $regex: shadeName, $options: 'i' } },  // Case insensitive regex
            { "model.customShade.name": { $regex: shadeName, $options: 'i' } }  // Case insensitive regex
        ];
    }

    // Handle text search filter
    if (search) {
        query.$text = { $search: search };
    }


    try {
        const products = await Product.find(query);
        res.status(200).json(new ApiResponse(200, 'Products fetched successfully', products));
    } catch (error) {
        return next(new ApiError(500, 'Error fetching products'));
    }
});




export { addProduct,getProducts };
