import express from "express";
import { createProduct, deleteProduct, getAllCountProducts, getAllProduct, getProduct,  updateProduct } from '../controllers/productontroler.js'
const router = express.Router()



router.post('/create', createProduct)
router.get('/', getAllProduct)
router.get('/count', getAllCountProducts)
router.get('/:id',getProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router