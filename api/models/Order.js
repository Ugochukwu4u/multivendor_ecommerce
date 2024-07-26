const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        customerName: { type: String, required: true },
        customerEmail: { type: String, required: true },
        customerAddress: { type: String, required: true },
        orderStatus: { type: String, default: 'Pending' },
        products: [
            {
                productImg:{type:String, required: true},
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true } // store the price at the time of order
            }
        ],
        orderTotal: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        paymentStatus: { type: String, default: 'Pending' },
        shippingFee: { type: Number, required: true },
        shippingAddress: { type: String, required: true },
        deliveryDate: { type: Date },
        orderDate: { type: Date, default: Date.now },
        vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
