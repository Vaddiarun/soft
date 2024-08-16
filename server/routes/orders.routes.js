import express from 'express'
import {addNewOrder,getActiveOrders,getSingleOrder,deleteOrder} from '../controllers/orders.controller.js'
import { verifyToken } from '../utils/verifyAdmin.js';

const router = express.Router()

router.post("/addorder", addNewOrder);
router.get("/activeorders",verifyToken, getActiveOrders);
router.get("/getSingleOrder/:id", verifyToken,getSingleOrder);
router.delete("/orderComplete/:id", verifyToken,deleteOrder);

export default router;