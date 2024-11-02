
import Stripe from 'stripe'
import { catchAsync } from '../utils/catchAsync.js';


const stripe = Stripe('sk_test_51MJi87JVapMBQzMXiKV24nPsdjG8kyoiaVwZv8PyB9SKSJr5YfRESOMWjgarYevkh01zUUtmyxVLZpCGFKBKqyOc00ZnoutJfH')


export const checkout = catchAsync(async (req, res, next) => {

    const sessison = await stripe.checkout.sessisons.create({
        line_items: req.body.items.map((item) => ({
       price_data: {
        curency: 'eur',
        product_data: {
            name:item.name,
            images:[item.imageUrl]
        },
        unit_amount: item.price * 100
       },
       quantity: item.quantity
        })),
        mode: 'payment',
        success_url:'http://localhost:5000/success.html',
        cancel_url : 'http://localhost:5000/cancel.html'
    })
    res.status(200).json(sessison)
    next(new AppError("Page not found"))
})