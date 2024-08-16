import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    table: {
        type: Number,
       required: true
    },
    items: {
       type: Array,
       required: true
    },

}, { timestamps: true })

const orderModel = new mongoose.model("order", orderSchema)

export default orderModel; 