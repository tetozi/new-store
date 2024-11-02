import mongoose from "mongoose";
import Products from "./productModel.js";





const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of category'],
        unique: true,
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        }
    ]
})
categorySchema.pre('save', async function (next) {
    const productsPromises = this.products.map(async id => await Products.findById(id))
    this.products = await Promise.all(productsPromises)
    next()
})
categorySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'products',
        select: '-__v'
    })
    next();
})

const Category = mongoose.model('Category', categorySchema)
export default Category