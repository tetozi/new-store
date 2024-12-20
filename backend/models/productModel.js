import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of product'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "Pizza must have a  price"]
    },
    imageUrl: {
        type: String,
        required: [true, 'Pizza  must have a image']
    },
    quantity: {
        type: Number,

    },
    description: {
        type: String
    },
    category: {
      //  type: mongoose.Schema.Types.ObjectId,
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

const Products = mongoose.model('Product', productSchema)

export default Products