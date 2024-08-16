import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
    }
})

const menu = mongoose.model("Menu", menuSchema);

export default menu;