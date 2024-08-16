import express from 'express';
import { verifyToken } from '../utils/verifyAdmin.js';

import { getAll,getFood,getDrinks,getItem,updateItem,create } from '../controllers/menu.controller.js';
const router = express.Router();

router.get("/all-items", getAll);
router.get("/food", getFood);
router.get("/softdrinks", getDrinks)
router.get("/singleItem/:title",getItem)
router.post("/update",verifyToken, updateItem)
router.post("/create",verifyToken,create)

export default router;