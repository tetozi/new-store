import Category from "../models/categoryModel.js";
import Products from "../models/productModel.js";
import { catchAsync } from '../utils/catchAsync.js';


export const getAllProduct = catchAsync(async (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 12;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  const products = await Products.find().skip(offset).limit(limit);

  res.status(200).json(products);
});

//Get count of products
export const getAllCountProducts = catchAsync(async (req, res, next) => {
  const totalProducts = await Products.countDocuments()
   
  res.status(200).json({
    status:'success',
    data:{
      totalProducts
    }
  })
})

// GET SINGLE Product
export const getProduct = catchAsync( async (req, res) => {

    const product = await Products.findById(req.params.id);
    
   // Return ERROR
    if(!product) {
      return  next(new AppError("Pizza not found"), 404)
      }

    res.status(200).json(product);
  
});




// CREATE Product
export const createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Products.create(req.body);

  // Find and add the products in category
  const category = await Category.findById(req.body.category);
  if (category) {
      category.products.push(newProduct._id);
      await category.save();
  }

  res.status(201).json({
      status: 'success',
      data: {
          product: newProduct
      }
  });
});


//Update Product
export const updateProduct = catchAsync( async (req, res, next) => {
    
    const category = await Category.findById(req.body.category)
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
       runValidators: true
    });
    if (!category) {
      return  next(new AppError("Category not found"), 404)
    }else{
      category.products.push(product._id);
      await category.save();
    }

    if(!product) {
      return  next(new AppError("Product not found"), 404)
      }

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });

});

export const deleteProduct = catchAsync( async (req, res, next) => {
  
  const product =  await Products.findByIdAndDelete(req.params.id);

    if(!product) {
      return  next(new AppError("Product not found"), 404)
      }

    res.status(204).json({
      status: 'success',
      data: null
    });
 
});
