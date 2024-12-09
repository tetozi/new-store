import express from 'express' 
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productontroler.js'
import { protect } from '../controllers/authController.js'


const router = express.Router()

// Get 
router.get('/', protect, getAllProduct);
router.get('/:id',protect, getProduct)
// Post
router.post('/create', createProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)


export default router