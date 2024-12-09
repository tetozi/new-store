import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync.js';
import User from '../models/userModel.js';
import AppError from '../error/AppError.js';


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",

    data: {
      user,
      token,
    },
  });
}


export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res)

});


export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  //correctPassword


  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});



export const protect = catchAsync(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1]

  }

  if (!token) {
    return next(new AppError('You are not logged in . Please lpggin', 401))
  }
  console.log(token)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log('Decoded token:', decoded);
  req.user = currentUser
  next()
})


export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You dont have to preform this acction ")
      )
    }
    next()
  }
}

export const forgotPassword = catchAsync(async (req, res, next) => {
  //Looking for User
  const user = await User.findOne({ email: req.body })
  if (!user) {
    return next(new AppError('You dont have registration ', 404))
  }

  const resetToken = user.resetTokenForPassword()
  await user.save({ validateBeforeSave : false})
})

export const resetPassword = (req, res, next) => { }