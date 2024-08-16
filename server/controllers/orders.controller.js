import express from 'express'

import orderModel from '../models/order.model.js'
import admin from '../models/admin.model.js';
import AllOrderModel from '../models/allOrders.model.js';

const addNewOrder = async (req, res) => {
    const orders = await orderModel.find({table:req.body.cartItems[0].table});
    if (orders.length === 0) {
        const data = req.body.cartItems;
        const order = {
            table: data[0].table,
            items: data,
        }
            const newOrder = new orderModel(order)
    const newAllOrder=new AllOrderModel(order)
    try {
        await newOrder.save()
        await newAllOrder.save()
        res.status(200).send({ success: true,newOrder })
    } catch (err) {
        res.status(500).send({success:false, message: err.message })
    }   
    }else {
        const id = orders[0]._id;
        console.log(id)
        const item=await orderModel.findById(id)
        const updated = await orderModel.findByIdAndUpdate(id, {
            $set: {
                items: [...item.items, ...req.body.cartItems]
            },
        }, { new: true });
        const existedAllOrder = await AllOrderModel.find({ table: req.body.cartItems[0].table }).sort([['_id', -1]]).limit(1);
        const updatedAll = await AllOrderModel.findByIdAndUpdate(existedAllOrder[0]._id, {
            $set: {
                items: [...existedAllOrder[0].items, ...req.body.cartItems]
            },
        }, { new: true });
        res.status(200).send({success:true, updated });
    }
}

const getActiveOrders = async (req,res) => {
    const user = await admin.findById(req.user.id)
    if (!user.isAdmin) {
        return res.status(403).json("You are not allowed to download orders");
    }
    try {
        const orders = await orderModel.find();
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getSingleOrder = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const order = await orderModel.findById(id);
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const { isAdmin } = req.user
    if (!isAdmin) {
        return res.status(401).json("You are not allowed to delete this order.")
    }
    try {
        const deletedOrder = await orderModel.findByIdAndDelete(id);
        res.status(200).send({ success:true,deletedOrder })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export {addNewOrder,deleteOrder,getActiveOrders,getSingleOrder}