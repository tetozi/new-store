import express from "express";
import { createProduct, deleteProduct, getAllCountProducts,
     getAllProduct, getProduct,  updateProduct } from '../controllers/productontroler.js'


const router = express.Router()


//Get 
router.get('/', getAllProduct)
router.get('/count', getAllCountProducts)
router.get('/:id',getProduct)



export default router