import express from "express"
import {addStock,getStock} from "../controllers/stock.controller.js"

const router = express.Router();

router.post("/addStock", addStock);  
router.get("/getStock", getStock);

export default router;