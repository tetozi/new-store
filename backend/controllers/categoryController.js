import Category from '../models/categoryModel.js';


import { catchAsync } from '../utils/catchAsync.js';

export const getAllCategory = catchAsync(async (req, res, next) => {

    const category = await Category.find()
    // SEND RESPONSE
    res.status(200).json(

        category

    );

});



export const getCategory = catchAsync(async (req, res) => {

    const category = await Category.findById(req.params.id).populate('products')

    // Return ERROR
    if (!category) {
        return next(new AppError("Category is not found"), 404)
    }

    res.status(200).json(category);

});


export const createCategory = catchAsync(async (req, res, next) => {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            category: newCategory
        }
    })
})
