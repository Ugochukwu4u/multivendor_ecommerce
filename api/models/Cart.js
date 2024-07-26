const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        products: [
            {
                productImg:{type:String, required: true},
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true } // store the price at the time of adding to cart
            }
        ],
        cartTotal: { type: Number, required: true, default: 0 },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Middleware to update cart total
CartSchema.pre('save', function(next) {
    const cart = this;
    cart.cartTotal = cart.products.reduce((total, product) => {
        return total + (product.quantity * product.price);
    }, 0);
    cart.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Cart', CartSchema);
