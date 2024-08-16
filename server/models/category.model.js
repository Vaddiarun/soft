import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
});

const category = mongoose.model("Category", categorySchema);

export default category;