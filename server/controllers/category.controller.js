import category from "../models/category.model.js"


const getAll = async(req,res) => {
    try { 
        const categories = await category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(`error: ${err.message}`)
    }
}

export {getAll}