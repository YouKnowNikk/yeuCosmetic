import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    cartId: { type: String, required: true, unique: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        shadeName: { type: String, required: true },
        quantity: { type: Number, required: true },
    }],
});

export const Cart = mongoose.model('Cart', CartSchema);


