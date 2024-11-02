import express from 'express'
import { checkout } from '../controllers/chekoutControler.js'


const router = express.Router()

router.post('/shopingcart', checkout)



export default router