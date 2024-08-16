import admin from "../models/admin.model.js";
import menu from "../models/menu.model.js";

const getAll = async (req, res) => {
    try {
        const menuItems = await menu.find();
        res.status(200).send({success:true,data:menuItems});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getFood = async (req, res) => {
    try {
        const menuItems = await menu.find({ category: $in["maggi", "fries", "burgers", "momos"] }) 
        res.status(200).json(menuItems)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getDrinks = async (req, res) => {
    try {
        const menuItems = await menu.find({ category: $in["milkshakes","lassi","falooda","icecream","special-icecreams","muds","coffee","dry-fruit-shake","mojito","cappuccino","addons","freshjuice"] }) 
        res.status(200).json(menuItems)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getItem = async (req, res) => {
    const { title } = req.params;
    const response = await menu.findOne({ title });
    res.status(200).json(response);
}

const updateItem = async (req, res) => {
    try {
        console.log(req.body)
     const updateItem = await menu.findByIdAndUpdate(req.body._id, {
        $set: {
             amount: req.body.amount,
             title: req.body.title,
            available:req.body.available
        },        
    },
        { new: true }
        )
    console.log(updateItem)
        res.status(200).send({ success:true,updateItem })
    } catch (err) {
        res.status(500).send({success:false, message: err.message });
    }

}

const create = async (req, res, next) => {
    const user = await admin.findById(req.user.id)
    if (!user.isAdmin) {

    return res.status(403).send( "You are not allowed to create a item");
  }

  if (!req.body.title || !req.body.amount) {
    return res.status(400).send( "Please provide all required fields");
  }

  const newPost = new menu({
    ...req.body,
  });
    try {
        const savedPost = await newPost.save();
        res.status(201).send({ success:true,savedPost });
    } catch (err) {
        console.log(err)
        return res.status(400).send({success:false,error: err.message})
  }
};

export { getAll,getFood ,getDrinks,getItem,updateItem,create};