import express from 'express';
import cors from 'cors';
import AppError from './error/AppError.js';
import morgan from 'morgan';
import {globalError} from './midleware/errorMidleware.js'
import authRouter from './Routes/authRouter.js'
import adminRouter from './Routes/adminRouter.js'
import productRourer from './Routes/productRourer..js'
import checkoutRouter from './Routes/checkoutRouter.js'
import categoryRouter from './Routes/categoryRouter.js'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
morgan.token('cookies', (req) => {
  return req.headers.cookie || 'No Cookies';
});

const app = express()
app.use(express.static('public'));
const accessLogStream = fs.createWriteStream(join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(
  morgan(':method :url :status - Cookies: :cookies - :response-time ms')
);
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true 
}));
app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

app.use((req,res , next) =>{
  console.log(req.cookies)
  next()
})

app.use('/api/user', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/product', productRourer)
app.use('/api/category', categoryRouter)

app.use('/shopingcart', checkoutRouter)
app.all('*', (req, res, next) => {
  console.log(`Unmatched route: ${req.method} ${req.originalUrl}`);
  next(new AppError('Page not found', 404));
});
  
app.use(globalError)



export default app