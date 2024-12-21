import express from 'express' 
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productontroler.js'



const router = express.Router()

// Get 
router.get('/',  getAllProduct);
router.get('/:id', getProduct)
// Post
router.post('/create', createProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)


export default router