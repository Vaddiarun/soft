import menu from "../models/menu.model.js";
import orderModel from "../models/order.model.js";
import admin from "../models/admin.model.js";
import AllOrderModel from "../models/allOrders.model.js";

const getAllData = async (req, res) => {
    const user = await admin.findById(req.user.id);
    if (!user.isAdmin) {
        return res.status(403).json("You are not allowed to download orders");
    }
    try {
        const orders = await AllOrderModel.find();    
        const totalOrders = await AllOrderModel.countDocuments();
        const totalItems = await menu.countDocuments();
        const menuItems = await menu.find()
        const now=new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
    const lasttMonthPosts = await AllOrderModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
        
        let oneWeekAgo;
        if (now.getDate() <= 7) {
            oneWeekAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                25+now.getDate()
            )
        } else {
                oneWeekAgo = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate() - 7
                );
        }
        const charts = {
            "momos": 0, "coffee": 0, "milkshakes": 0, "falooda": 0, "maggi": 0, "fries": 0, "cappuccino": 0, "icecream": 0, "special-icecreams": 0,"burgers":0,"addons":0,"freshjuice":0,"muds":0,"dry-fruit-shake":0,"mojito":0,"lassi":0}    
        
    const lastWeekPosts = await AllOrderModel.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });
        let totalOrdersWithQunatity = 0;
        
        for (let i = 0; i < orders.length; i++){
            for (let j = 0; j < orders[i].items.length; j++){
                charts[orders[i].items[j].category] += orders[i].items[j].quantity
                totalOrdersWithQunatity += orders[i].items[j].quantity
            }
        }
      console.log(orders,totalOrders,totalItems,menuItems,lasttMonthPosts,lastWeekPosts,totalOrdersWithQunatity,charts)
        res.status(200).json({orders, totalOrders, totalItems, menuItems,lasttMonthPosts,lastWeekPosts,totalOrdersWithQunatity,charts}) 
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

export {getAllData}