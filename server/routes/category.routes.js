import express from 'express';
import { getAll } from '../controllers/category.controller.js';

const router = express.Router();

router.get("/all-items", getAll);

export default router;