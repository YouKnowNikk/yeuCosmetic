import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shadeSchema = new Schema({
    name: { type: String, required: true },  
    hexValue: { type: String, required: true }  
}, { _id: false });

const customShadeSchema = new Schema({
    name: { type: String },
    imageFile: { type: String }
}, { _id: false });

const modelSchema = new Schema({
    shades: [shadeSchema],
    customShade: [customShadeSchema]
}, { _id: false });

// Define the Product schema
const productSchema = new Schema({
    title: { type: String, required: true },  
    modelNumber:{type:String,required:true,unique:true},
    shortDescription: { type: String, required: true },  
    description: { type: String, required: true }, 
    price: { type: Number, required: true },  
    thumbnails: [{ type: String }],  
    category: { type: String, enum: ['lipstick', 'foundation', 'blush', 'eyeliner'], required: true },  
    model: modelSchema,  // Single model
    reviews: {
        averageRating: { type: Number },  
        numberOfReviews: { type: Number } 
    },
    tags: { type: String }
}, { timestamps: true });

productSchema.index({ title: "text", shortDescription: "text", description: "text" ,modelNumber:"text" ,category:'text'});

export const Product = mongoose.model('Product', productSchema);
