import express from "express";
import { createCategory, getAllCategory, getCategory } from "../controllers/categoryController.js";

const router =  express.Router()


router.get('/:id', getCategory)
router.post('/create', createCategory)
router.get('/', getAllCategory)



export default router