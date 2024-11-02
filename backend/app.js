import express from 'express';
import cors from 'cors';
import AppError from './error/AppError.js';
import morgan from 'morgan';
import {globalError} from './midleware/errorMidleware.js'
import authRouter from './Routes/authRouter.js'
import productRourer from './Routes/productRourer..js'
import checkoutRouter from './Routes/checkoutRouter.js'
import categoryRouter from './Routes/categoryRouter.js'


const app = express()
app.use(express.static('public'))
app.use(morgan('combined'))

app.use(express.json());

app.use(cors());

app.use('/api/user', authRouter)
app.use('/api/product', productRourer)
app.use('/api/category', categoryRouter)

app.use('/shopingcart', checkoutRouter)
app.all('*', (req, res, next) => {
 
    next(new AppError('Page not found '), 404)
  })
  
app.use(globalError)



export default app