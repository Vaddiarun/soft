import mongoose from "mongoose"

const AllOrdersSchema = new mongoose.Schema({
    table: {
        type: Number,
       required: true
    },
    items: {
       type: Array,
       required: true
    },

}, { timestamps: true })

const AllOrderModel = new mongoose.model("AllOrders", AllOrdersSchema)

export default AllOrderModel; 